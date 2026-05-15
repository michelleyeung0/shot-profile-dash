import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";

const card =
  "group block p-6 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 hover:border-gray-400 hover:shadow-sm transition-all";
const cardTitle = "text-xl font-semibold text-gray-900 mb-2";
const cardBody = "text-gray-500 text-sm";

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
            <Link href="/shot-map" className={card}>
              <h2 className={cardTitle}>Shot Map</h2>
              <p className={cardBody}>
                Visualize shot locations on a court diagram. Filter by player,
                shot type, outcome, contest level, and assisted status.
              </p>
            </Link>
            <Link href="/tendencies" className={card}>
              <h2 className={cardTitle}>Player Shot Creation Tendencies</h2>
              <p className={cardBody}>
                Compare a player&apos;s shot creation profile against the rest
                of the team — spot-up, self-created, cut/off-ball, and post-up.
              </p>
            </Link>
          </div>
        </div>
      </main>
      <Analytics />
    </>
  );
}
