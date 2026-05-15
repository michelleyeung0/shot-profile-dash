"use client";

import { ShotType, ContestLevel } from "@/types/shot";
import { FilterState, DEFAULT_FILTERS } from "@/types/filters";
import { filterPanel, selectInput } from "@/lib/styles";
import { SHOT_TYPE_LABELS, CONTEST_LABELS } from "@/lib/labels";

type Player = { shooter_id: string; shooter_name: string };

type FilterPanelProps = {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  players: Player[];
};

const sectionHeader =
  "text-xs font-medium text-gray-500 uppercase tracking-wide mb-2";
const clearBtn = "text-xs text-gray-400 hover:text-gray-700 transition-colors";
const checkboxLabel = "flex items-center gap-2 cursor-pointer";
const checkboxGroup = "flex flex-col gap-1.5";
const toggleGroup = "flex gap-1";

function toggleBtnClass(active: boolean) {
  return `flex-1 py-1 rounded text-xs capitalize transition-colors ${
    active
      ? "bg-gray-800 text-white font-medium"
      : "bg-gray-300 text-gray-600 hover:bg-gray-400"
  }`;
}

export default function FilterPanel({
  filters,
  onChange,
  players
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
    <div className={filterPanel}>
      <div className="flex items-center justify-between">
        <span className="font-semibold text-base">Filters</span>
        <button onClick={() => onChange(DEFAULT_FILTERS)} className={clearBtn}>
          Reset
        </button>
      </div>

      <section>
        <h3 className={sectionHeader}>Player</h3>
        <select
          value={filters.player ?? ""}
          onChange={(e) =>
            onChange({ ...filters, player: e.target.value || null })
          }
          className={selectInput}
        >
          <option value="">All players</option>
          {players.map((p) => (
            <option key={p.shooter_id} value={p.shooter_id}>
              {p.shooter_name}
            </option>
          ))}
        </select>
        {!filters.player && (
          <p className="text-xs text-gray-400 mt-1">
            Select a player to enable plot tooltips
          </p>
        )}
      </section>

      <section>
        <h3 className={sectionHeader}>Outcome</h3>
        <div className={toggleGroup}>
          {(["all", "made", "missed"] as const).map((o) => (
            <button
              key={o}
              onClick={() => onChange({ ...filters, outcome: o })}
              className={toggleBtnClass(filters.outcome === o)}
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
              className={clearBtn}
            >
              Clear
            </button>
          )}
        </div>
        <div className={checkboxGroup}>
          {[
            ShotType.Jumper,
            ShotType.Post,
            ShotType.Floater,
            ShotType.Layup
          ].map((type) => (
            <label key={type} className={checkboxLabel}>
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
              className={clearBtn}
            >
              Clear
            </button>
          )}
        </div>
        <div className={checkboxGroup}>
          {[
            ContestLevel.Uncontested,
            ContestLevel.LightlyContested,
            ContestLevel.HeavilyContested
          ].map((level) => (
            <label key={level} className={checkboxLabel}>
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
        <h3 className={sectionHeader}>Creation</h3>
        <div className={toggleGroup}>
          {(["all", "assisted", "unassisted"] as const).map((a) => (
            <button
              key={a}
              onClick={() => onChange({ ...filters, assisted: a })}
              className={toggleBtnClass(filters.assisted === a)}
            >
              {a}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
