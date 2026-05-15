import { ShotType, ContestLevel } from "@/types/shot";

export const SHOT_TYPE_LABELS: Record<ShotType, string> = {
  [ShotType.Jumper]: "Jumper",
  [ShotType.Post]: "Post",
  [ShotType.Floater]: "Floater",
  [ShotType.Layup]: "Layup",
  [ShotType.Heave]: "Heave"
};

export const CONTEST_LABELS: Record<ContestLevel, string> = {
  [ContestLevel.Uncontested]: "Uncontested",
  [ContestLevel.LightlyContested]: "Lightly Contested",
  [ContestLevel.HeavilyContested]: "Heavily Contested"
};
