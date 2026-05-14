"use client";

import { useEffect, useMemo, useState } from "react";
import { Shot } from "@/types/shot";
import { FilterState, DEFAULT_FILTERS } from "@/types/filters";
import CourtContainer from "@/components/CourtContainer";
import FilterPanel from "@/components/FilterPanel";

export default function ShotMapPage() {
  const [shots, setShots] = useState<Shot[]>([]);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  useEffect(() => {
    async function fetchShots() {
      try {
        const response = await fetch("/api/shots");
        const data = await response.json();
        setShots(data);
      } catch (error) {
        console.error("Error fetching shots:", error);
      }
    }
    fetchShots();
  }, []);

  const players = useMemo(() => {
    const map = new Map<string, string>();
    shots.forEach((s) => map.set(s.shooter_id, s.shooter_name));
    return Array.from(map.entries())
      .map(([id, name]) => ({ shooter_id: id, shooter_name: name }))
      .sort((a, b) => a.shooter_name.localeCompare(b.shooter_name));
  }, [shots]);

  const filteredShots = useMemo(() => {
    return shots.filter((shot) => {
      if (filters.player !== null && shot.shooter_id !== filters.player)
        return false;
      if (
        filters.shotTypes.length > 0 &&
        !filters.shotTypes.includes(shot.shot_type)
      )
        return false;
      if (filters.outcome === "made" && !shot.outcome) return false;
      if (filters.outcome === "missed" && shot.outcome) return false;
      if (
        filters.contestLevels.length > 0 &&
        !filters.contestLevels.includes(shot.contest_level)
      )
        return false;
      if (filters.assisted === "assisted" && !shot.assisted) return false;
      if (filters.assisted === "unassisted" && shot.assisted) return false;
      return true;
    });
  }, [shots, filters]);

  return (
    <main className="flex flex-col h-[calc(100vh-3.5rem)] p-6">
      <div className="flex items-baseline gap-3 mb-4">
        <h1 className="text-2xl font-bold">Shot Map & Efficiency</h1>
        {shots.length > 0 && (
          <span className="text-sm text-gray-400">
            {filteredShots.length.toLocaleString()} of{" "}
            {shots.length.toLocaleString()} shots
          </span>
        )}
      </div>
      <div className="flex flex-1 min-h-0 gap-6">
        <FilterPanel
          filters={filters}
          onChange={setFilters}
          players={players}
        />
        <div className="flex-1 min-h-0">
          <CourtContainer
                  shots={filteredShots}
                  showTooltips={filters.player !== null}
                  label={
                    filteredShots.length > 0
                      ? `${((filteredShots.filter((s) => s.outcome).length / filteredShots.length) * 100).toFixed(1)}% FG`
                      : ""
                  }
                />
        </div>
      </div>
    </main>
  );
}
