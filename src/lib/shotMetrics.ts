import { Shot } from "@/types/shot";

export type ShotMetrics = {
  rimRate: number;
  midRangeRate: number;
  threePtRate: number;
  eFGPercent: number;
  assistedRate: number;
  catchAndShootRate: number;
};

type ShotForMetrics = Pick<
  Shot,
  "outcome" | "is_three_pointer" | "is_rim" | "assisted" | "catch_and_shoot"
>;

export function computeMetrics(shots: ShotForMetrics[]): ShotMetrics | null {
  if (shots.length === 0) return null;

  const fga = shots.length;
  const fgm = shots.filter((s) => s.outcome).length;
  const threeAttempts = shots.filter((s) => s.is_three_pointer).length;
  const threeMade = shots.filter((s) => s.is_three_pointer && s.outcome).length;
  const rimAttempts = shots.filter((s) => s.is_rim).length;
  const assistedMade = shots.filter((s) => s.assisted && s.outcome).length;
  const catchAndShootAttempts = shots.filter((s) => s.catch_and_shoot).length;

  return {
    rimRate: rimAttempts / fga,
    midRangeRate: (fga - threeAttempts - rimAttempts) / fga, // total attempts - three attempts - rim attempts = all mid-range attempts
    threePtRate: threeAttempts / fga,
    eFGPercent: (fgm + 0.5 * threeMade) / fga,
    assistedRate: fgm > 0 ? assistedMade / fgm : 0,
    catchAndShootRate: catchAndShootAttempts / fga,
  };
}
