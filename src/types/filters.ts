import { ShotType, ContestLevel } from "./shot";

export enum Outcome {
  All = "all",
  Made = "made",
  Missed = "missed"
}

export enum AssistedFilter {
  All = "all",
  Assisted = "assisted",
  Unassisted = "unassisted"
}

export type FilterState = {
  player: string | null;
  shotTypes: ShotType[];
  outcome: Outcome;
  contestLevels: ContestLevel[];
  assisted: AssistedFilter;
};

export const DEFAULT_FILTERS: FilterState = {
  player: null,
  shotTypes: [],
  outcome: Outcome.All,
  contestLevels: [],
  assisted: AssistedFilter.All
};
