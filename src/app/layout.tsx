import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App with Prisma",
  description: "A simple todo app with Next.js and Prisma",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center py-10 px-4">
          <main className="container max-w-3xl">{children}</main>
        </div>
      </body>
    </html>
  );
}
