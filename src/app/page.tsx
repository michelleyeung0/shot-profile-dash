import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center h-[calc(100vh-3.5rem)] px-6">
        <div className="w-full max-w-2xl">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 font-sans">
              Shot Profile Dashboard
            </h1>
            <p className="text-gray-500 mt-2 text-lg">
              2024 - 2025 NBA Regular Season
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/shot-map"
            className="group block p-6 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 hover:border-gray-400 hover:shadow-sm transition-all"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Shot Map
            </h2>
            <p className="text-gray-500 text-sm">
              Visualize shot locations on a court diagram. Filter by player,
              shot type, outcome, contest level, and assisted status.
            </p>
          </Link>
          <Link
            href="/tendencies"
            className="group block p-6 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 hover:border-gray-400 hover:shadow-sm transition-all"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Player Tendencies
            </h2>
            <p className="text-gray-500 text-sm">
              Compare a player&apos;s shot profile against their teammates — rim
              rate, mid-range rate, three-point rate, eFG%, and creation
              metrics.
            </p>
          </Link>
          </div>
        </div>
      </main>
      <Analytics />
    </>
  );
}
