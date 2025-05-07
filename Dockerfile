# Base image
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies only when needed
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# Build the app
FROM deps AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build Next.js app
RUN npm run build

# Ensure public directory exists, even if empty, before runner tries to copy it
RUN mkdir -p /app/public

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create a non-root user and switch to it
RUN addgroup --system --gid 1001 nodejs

# Install necessary dependencies for runtime (prisma need this)
RUN apk add --no-cache openssl libc6-compat

RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copy build output and necessary files
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Ensure the SQLite directory exists and is writable
RUN mkdir -p /app/prisma
VOLUME /app/prisma

# Expose the port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]