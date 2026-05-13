import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shot Profile Dashboard",
  description: "NBA Shot Analysis Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-white min-h-screen`}
      >
        <nav className="border-b border-gray-800 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <span className="font-semibold text-lg tracking-tight">
              Shot Profile Dashboard
            </span>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <Link
                href="/shot-map"
                className="hover:text-white transition-colors"
              >
                Shot Map
              </Link>
              <Link
                href="/tendencies"
                className="hover:text-white transition-colors"
              >
                Player Tendencies
              </Link>
            </div>
          </div>
        </nav>
        <div className="max-w-7xl mx-auto px-6 py-8">{children}</div>
      </body>
    </html>
  );
}
