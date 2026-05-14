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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen body-bg`}
      >
        <nav className="bg-white border-b border-gray-200 pr-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link
              href="/"
              className="font-semibold text-lg tracking-tight text-gray-900"
            >
              Shot Profile Dashboard
            </Link>
            <div className="flex gap-6 text-sm text-gray-500">
              <Link
                href="/shot-map"
                className="hover:text-gray-900 transition-colors"
              >
                Shot Map
              </Link>
              <Link
                href="/tendencies"
                className="hover:text-gray-900 transition-colors"
              >
                Player Tendencies
              </Link>
            </div>
          </div>
        </nav>
        <div className="w-full">{children}</div>
      </body>
    </html>
  );
}
