"use client";

import { useEffect, useState } from "react";
import { ShotMetrics } from "@/lib/shotMetrics";
import ProfileChart from "@/components/TendenciesChart";

type Player = { shooter_id: string; shooter_name: string };

export default function TendenciesPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [metricsMap, setMetricsMap] = useState<
    Map<string, { player: ShotMetrics; rot: ShotMetrics }>
  >(new Map());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await fetch("/api/players");
        const data = await response.json();
        const sortedPlayers = data.sort((a: Player, b: Player) =>
          a.shooter_name.localeCompare(b.shooter_name)
        );
        setPlayers(sortedPlayers);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    }
    fetchPlayers();
  }, []);

  useEffect(() => {
    if (!selectedPlayer) return;
    async function fetchMetrics() {
      setLoading(true);
      try {
        const response = await fetch(`/api/profile/${selectedPlayer}`);
        const data = await response.json();
        setMetricsMap((prev) => new Map(prev).set(selectedPlayer!, data));
      } catch (error) {
        console.error("Error fetching metrics:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMetrics();
  }, [selectedPlayer]);

  const metrics = selectedPlayer
    ? (metricsMap.get(selectedPlayer) ?? null)
    : null;

  const selectedPlayerName = players.find(
    (p) => p.shooter_id === selectedPlayer
  )?.shooter_name;

  return (
    <main className="flex flex-col h-[calc(100vh-3.5rem)] p-6">
      <div className="flex items-baseline gap-3 mb-4">
        <h1 className="text-2xl font-bold">Player Tendencies</h1>
      </div>
      <div className="flex flex-1 min-h-0 gap-6">
        <div className="w-52 flex-shrink-0 flex flex-col gap-5 text-sm bg-gray-200 text-gray-900 rounded-lg p-4">
          <span className="font-semibold text-base">Player</span>
          <select
            value={selectedPlayer ?? ""}
            onChange={(e) => setSelectedPlayer(e.target.value || null)}
            className="w-full px-2 py-1.5 bg-white border border-gray-300 rounded text-xs text-gray-800 focus:outline-none focus:border-gray-500"
          >
            <option value="">Select a player</option>
            {players.map((p) => (
              <option key={p.shooter_id} value={p.shooter_id}>
                {p.shooter_name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-h-0 relative">
          {!selectedPlayer && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
              Select a player to view their shot profile
            </div>
          )}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
              Loading...
            </div>
          )}
          {!loading && metrics && selectedPlayerName && (
            <div className="absolute inset-0">
              <ProfileChart
                playerMetrics={metrics.player}
                rotMetrics={metrics.rot}
                playerName={selectedPlayerName}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
