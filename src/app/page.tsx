import Link from "next/link";
import { Analytics } from "@vercel/analytics/next"

export default function Home() {
  return (
    <>
      <main className="flex flex-col gap-8 mt-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Shot Profile Dashboard
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            2024 - 2025 NBA Regular Season
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Link
            href="/shot-map"
            className="group block p-6 rounded-xl border border-gray-800 hover:border-gray-600 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">Shot Map</h2>
            <p className="text-gray-400 text-sm">Dashboard 1 description</p>
          </Link>
          <Link
            href="/tendencies"
            className="group block p-6 rounded-xl border border-gray-800 hover:border-gray-600 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">Player Tendencies</h2>
            <p className="text-gray-400 text-sm">Dashboard 2 description</p>
          </Link>
        </div>
      </main>
      <Analytics />
    </>
  );
}
