import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FloatingNavDemo } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GainDOT",
  description:
    "A blockchain-based fitness app that incentivizes users with APR on investments tied to fitness goals, incorporating social betting, AI exercise tracking, and rewarding users with NFTs and ranks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-black">
        <FloatingNavDemo />
        {children}
      </body>
    </html>
  );
}
