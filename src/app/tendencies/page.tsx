"use client";

import { useEffect, useState } from "react";
import { ShotMetrics } from "@/lib/shotMetrics";
import ProfileChart from "@/components/TendenciesChart";
import {
  dashboardPage,
  dashboardHeader,
  dashboardTitle,
  dashboardContent,
  selectInput
} from "@/lib/styles";

type Player = { shooter_id: string; shooter_name: string };

const sidebar =
  "w-52 flex-shrink-0 self-start flex flex-col gap-3 text-sm bg-gray-200 text-gray-900 rounded-lg p-4";
const overlay =
  "absolute inset-0 flex items-center justify-center text-gray-500 text-m";

export default function TendenciesPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [metricsMap, setMetricsMap] = useState<
    Map<string, { player: ShotMetrics; rot: ShotMetrics }>
  >(new Map());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await fetch("/api/players");
        if (!response.ok) throw new Error("Failed to load players");
        const data = await response.json();
        const sortedPlayers = data.sort((a: Player, b: Player) =>
          a.shooter_name.localeCompare(b.shooter_name)
        );
        setPlayers(sortedPlayers);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Something went wrong"
        );
      }
    }
    fetchPlayers();
  }, []);

  useEffect(() => {
    if (!selectedPlayer) return;
    async function fetchMetrics() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/profile/${selectedPlayer}`);
        if (!response.ok) throw new Error("Failed to load player data");
        const data = await response.json();
        setMetricsMap((prev) => new Map(prev).set(selectedPlayer!, data));
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Something went wrong"
        );
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
    <main className={dashboardPage}>
      <div className={dashboardHeader}>
        <h1 className={dashboardTitle}>Player Tendencies</h1>
      </div>
      <div className={dashboardContent}>
        <div className={sidebar}>
          <span className="font-semibold text-base">Player</span>
          <select
            value={selectedPlayer ?? ""}
            onChange={(e) => setSelectedPlayer(e.target.value || null)}
            className={selectInput}
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
            <div className={overlay}>
              Select a player to view their shot creation profile
            </div>
          )}
          {loading && <div className={overlay}>Loading...</div>}
          {!loading && error && (
            <div className={overlay + " text-red-400"}>{error}</div>
          )}
          {!loading && !error && metrics && selectedPlayerName && (
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
