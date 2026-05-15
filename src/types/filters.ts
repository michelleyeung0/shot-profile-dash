import { ShotType, ContestLevel } from "./shot";

export type FilterState = {
  player: string | null;
  shotTypes: ShotType[];
  outcome: "all" | "made" | "missed";
  contestLevels: ContestLevel[];
  assisted: "all" | "assisted" | "unassisted";
};

export const DEFAULT_FILTERS: FilterState = {
  player: null,
  shotTypes: [],
  outcome: "all",
  contestLevels: [],
  assisted: "all"
};
