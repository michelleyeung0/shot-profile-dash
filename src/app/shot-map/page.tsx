"use client";

import { useEffect, useMemo, useState } from "react";
import { Shot } from "@/types/shot";
import {
  FilterState,
  DEFAULT_FILTERS,
  Outcome,
  AssistedFilter
} from "@/types/filters";
import CourtContainer from "@/components/CourtContainer";
import FilterPanel from "@/components/FilterPanel";
import {
  dashboardPage,
  dashboardHeader,
  dashboardTitle,
  dashboardContent
} from "@/lib/styles";

export default function ShotMapPage() {
  const [shots, setShots] = useState<Shot[]>([]);
  const [players, setPlayers] = useState<
    { shooter_id: string; shooter_name: string }[]
  >([]);
  const [shotsLoaded, setShotsLoaded] = useState(false);
  const [shotMetrics, setShotMetrics] = useState<{
    fgm: number;
    fga: number;
    threes_made: number;
    fg_percent: number;
    efg_percent: number;
  } | null>(null);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [error, setError] = useState<string | null>(null);
  const [playersReady, setPlayersReady] = useState(false);

  // Fetch all players once on mount for select field
  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await fetch("/api/players");
        if (!response.ok) throw new Error("Failed to load players");
        const data = await response.json();
        setPlayers(data ?? []);
        setPlayersReady(true);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    }
    fetchPlayers();
  }, []);

  useEffect(() => {
    async function fetchShots() {
      try {
        if (filters.player) {
          // Build query params with all filters
          const params = new URLSearchParams();
          params.append("player", filters.player);
          if (filters.shotTypes.length > 0) {
            params.append("shotTypes", filters.shotTypes.join(","));
          }
          if (filters.outcome !== Outcome.All) {
            params.append("outcome", filters.outcome);
          }
          if (filters.contestLevels.length > 0) {
            params.append("contestLevels", filters.contestLevels.join(","));
          }
          if (filters.assisted !== AssistedFilter.All) {
            params.append("assisted", filters.assisted);
          }

          const response = await fetch(`/api/shots?${params.toString()}`);
          if (!response.ok) throw new Error("Failed to load shot data");
          const data = await response.json();
          setShots(data.shots ?? []);
          setShotMetrics(data.metrics ?? null);
        } else {
          const response = await fetch("/api/shots");
          if (!response.ok) throw new Error("Failed to load shot data");
          const data = await response.json();
          setShots(data);
          setShotMetrics(null);
        }
        setShotsLoaded(true);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Something went wrong"
        );
      }
    }
    fetchShots();
  }, [filters]);

  const filteredShots = useMemo(() => {
    // If a player is selected, shots are already filtered by the API
    if (filters.player !== null) {
      return shots;
    }

    // Otherwise, filter shots client-side based on all criteria
    return shots.filter((shot) => {
      if (
        filters.shotTypes.length > 0 &&
        !filters.shotTypes.includes(shot.shot_type)
      )
        return false;
      if (filters.outcome === Outcome.Made && !shot.outcome) return false;
      if (filters.outcome === Outcome.Missed && shot.outcome) return false;
      if (
        filters.contestLevels.length > 0 &&
        !filters.contestLevels.includes(shot.contest_level)
      )
        return false;
      if (filters.assisted === AssistedFilter.Assisted && !shot.assisted)
        return false;
      if (filters.assisted === AssistedFilter.Unassisted && shot.assisted)
        return false;
      return true;
    });
  }, [shots, filters]);

  // Including calculations here instead of CourtContainer.tsx since filteredShots is already calculated here
  const shotStats = useMemo(() => {
    if (!shotsLoaded) return "";

    if (shotMetrics && filters.player !== null) {
      const { fgm, fga, fg_percent, efg_percent } = shotMetrics;
      return `${fgm} FGM · ${fga} FGA · ${fg_percent.toFixed(1)}% FG · ${efg_percent.toFixed(1)}% eFG`;
    }

    const fgm = filteredShots.filter((s) => s.outcome).length;
    const fga = filteredShots.length;
    const threesMade = filteredShots.filter(
      (s) => s.outcome && s.is_three_pointer
    ).length;
    const fgPercent = fga > 0 ? ((fgm / fga) * 100).toFixed(1) : "0.0";
    const eFGPercent =
      fga > 0 ? (((fgm + 0.5 * threesMade) / fga) * 100).toFixed(1) : "0.0";

    return `${fgm} FGM · ${fga} FGA · ${fgPercent}% FG · ${eFGPercent}% eFG`;
  }, [filteredShots, shotsLoaded, shotMetrics, filters.player]);

  if (error)
    return (
      <main className={dashboardPage}>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      </main>
    );

  return (
    <main className={dashboardPage}>
      <div className={dashboardHeader}>
        <h1 className={dashboardTitle}>Player Shot Map</h1>
        {shots.length > 0 && (
          <span className="text-sm text-gray-400">
            {filteredShots.length.toLocaleString()} of{" "}
            {shots.length.toLocaleString()} shots
          </span>
        )}
      </div>
      <div className={dashboardContent}>
        <FilterPanel
          filters={filters}
          onChange={setFilters}
          players={players}
          playerFieldDisabled={!playersReady}
        />
        <div className="flex-1 min-h-0">
          <CourtContainer
            shots={filteredShots}
            dataLoaded={shotsLoaded}
            showTooltips={filters.player !== null}
            sublabel={shotStats}
            playerName={
              filters.player !== null
                ? players.find((p) => p.shooter_id === filters.player)
                    ?.shooter_name
                : "ALL PLAYERS"
            }
          />
        </div>
      </div>
    </main>
  );
}
