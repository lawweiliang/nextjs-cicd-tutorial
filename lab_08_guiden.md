# Comparison between Lab 07 and Lab 08

## GitHub Actions Workflow Changes

- **Lab 07:**

  - Docker build command does not include build arguments.
  - No environment variable handling during Docker build.

- **Lab 08:**
  - Docker build command includes `DATABASE_URL` as a build argument.
  - Environment variables are managed using GitHub Actions secrets.

## Dockerfile Changes

- **Lab 07:**

  - No handling of `DATABASE_URL` during build.

- **Lab 08:**
  - Added `ARG DATABASE_URL` and `ENV DATABASE_URL=${DATABASE_URL}` to handle environment variables during build.

## Environment Management

- **Lab 07:**

  - Environment variables are not explicitly managed.

- **Lab 08:**
  - Environment variables are managed using GitHub Actions secrets and Docker build arguments.

This guide highlights the key differences between Lab 07 and Lab 08, focusing on improvements in environment variable management and CI/CD setup.
