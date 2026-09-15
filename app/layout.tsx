import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SpendWise AI - Personal Finance Dashboard",
  description:
    "Premium AI-powered personal finance management and expense tracking",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-bg-secondary text-text-primary antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
