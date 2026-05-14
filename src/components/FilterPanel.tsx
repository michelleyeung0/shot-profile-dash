"use client";

import { ShotType, ContestLevel } from "@/types/shot";
import { FilterState, DEFAULT_FILTERS } from "@/types/filters";

type Player = { shooter_id: string; shooter_name: string };

type FilterPanelProps = {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  players: Player[];
};

const SHOT_TYPE_LABELS: Record<ShotType, string> = {
  [ShotType.Jumper]: "Jumper",
  [ShotType.Post]: "Post",
  [ShotType.Floater]: "Floater",
  [ShotType.Layup]: "Layup",
  [ShotType.Heave]: "Heave",
};

const CONTEST_LABELS: Record<ContestLevel, string> = {
  [ContestLevel.Uncontested]: "Uncontested",
  [ContestLevel.LightlyContested]: "Lightly contested",
  [ContestLevel.HeavilyContested]: "Heavily contested",
};

export default function FilterPanel({
  filters,
  onChange,
  players,
}: FilterPanelProps) {
  function toggleShotType(type: ShotType) {
    const next = filters.shotTypes.includes(type)
      ? filters.shotTypes.filter((t) => t !== type)
      : [...filters.shotTypes, type];
    onChange({ ...filters, shotTypes: next });
  }

  function toggleContestLevel(level: ContestLevel) {
    const next = filters.contestLevels.includes(level)
      ? filters.contestLevels.filter((l) => l !== level)
      : [...filters.contestLevels, level];
    onChange({ ...filters, contestLevels: next });
  }

  return (
    <div className="w-52 flex-shrink-0 self-start flex flex-col gap-5 overflow-y-auto text-sm bg-gray-200 text-gray-900 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-base">Filters</span>
        <button
          onClick={() => onChange(DEFAULT_FILTERS)}
          className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
        >
          Reset
        </button>
      </div>

      <section>
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
          Player
        </h3>
        <select
          value={filters.player ?? ""}
          onChange={(e) =>
            onChange({ ...filters, player: e.target.value || null })
          }
          className="w-full px-2 py-1.5 bg-white border border-gray-300 rounded text-xs text-gray-800 focus:outline-none focus:border-gray-500"
        >
          <option value="">All players</option>
          {players.map((p) => (
            <option key={p.shooter_id} value={p.shooter_id}>
              {p.shooter_name}
            </option>
          ))}
        </select>
      </section>

      <section>
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
          Outcome
        </h3>
        <div className="flex gap-1">
          {(["all", "made", "missed"] as const).map((o) => (
            <button
              key={o}
              onClick={() => onChange({ ...filters, outcome: o })}
              className={`flex-1 py-1 rounded text-xs capitalize transition-colors ${
                filters.outcome === o
                  ? "bg-gray-800 text-white font-medium"
                  : "bg-gray-300 text-gray-600 hover:bg-gray-400"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Shot Type
          </h3>
          {filters.shotTypes.length > 0 && (
            <button
              onClick={() => onChange({ ...filters, shotTypes: [] })}
              className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          {[
            ShotType.Jumper,
            ShotType.Post,
            ShotType.Floater,
            ShotType.Layup,
          ].map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.shotTypes.includes(type)}
                onChange={() => toggleShotType(type)}
                className="accent-gray-800"
              />
              <span className="text-gray-800">{SHOT_TYPE_LABELS[type]}</span>
            </label>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Contest Level
          </h3>
          {filters.contestLevels.length > 0 && (
            <button
              onClick={() => onChange({ ...filters, contestLevels: [] })}
              className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          {[
            ContestLevel.Uncontested,
            ContestLevel.LightlyContested,
            ContestLevel.HeavilyContested,
          ].map((level) => (
            <label
              key={level}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.contestLevels.includes(level)}
                onChange={() => toggleContestLevel(level)}
                className="accent-gray-800"
              />
              <span className="text-gray-800">{CONTEST_LABELS[level]}</span>
            </label>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
          Creation
        </h3>
        <div className="flex gap-1">
          {(["all", "assisted", "unassisted"] as const).map((a) => (
            <button
              key={a}
              onClick={() => onChange({ ...filters, assisted: a })}
              className={`flex-1 py-1 rounded text-xs capitalize transition-colors ${
                filters.assisted === a
                  ? "bg-gray-800 text-white font-medium"
                  : "bg-gray-300 text-gray-600 hover:bg-gray-400"
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
