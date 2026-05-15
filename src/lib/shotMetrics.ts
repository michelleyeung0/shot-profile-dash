import { ComplexShotType, Shot } from "@/types/shot";

export type ShotMetrics = {
  spotUpRate: number;
  selfCreatedRate: number;
  cutOffBallRate: number;
  postUpRate: number;
  eFGPercent: number;
};

type ShotForMetrics = Pick<
  Shot,
  "outcome" | "is_three_pointer" | "complex_shot_type" | "assisted" | "ast_opp"
>;

const SPOT_UP = new Set([
  ComplexShotType.CatchAndShoot,
  ComplexShotType.CatchAndShootRelocating,
  ComplexShotType.CatchAndShootOnMoveLeft,
  ComplexShotType.CatchAndShootOnMoveRight
]);

const SELF_CREATED = new Set([
  ComplexShotType.PullupJumper,
  ComplexShotType.Stepback,
  ComplexShotType.ShakeAndRaise,
  ComplexShotType.OverScreen,
  ComplexShotType.DrivingFloater,
  ComplexShotType.DrivingLayup
]);

const CUT_OFF_BALL = new Set([
  ComplexShotType.CutFloater,
  ComplexShotType.CutLayup,
  ComplexShotType.Lob,
  ComplexShotType.Tip
]);

const POST_UP = new Set([ComplexShotType.PostLeft, ComplexShotType.PostRight]);

export function computeMetrics(shots: ShotForMetrics[]): ShotMetrics | null {
  const nonHeaves = shots.filter(
    (s) => s.complex_shot_type !== ComplexShotType.Heave
  );
  if (nonHeaves.length === 0) return null;

  const fga = nonHeaves.length;
  let spotUp = 0,
    selfCreated = 0,
    cutOffBall = 0,
    postUp = 0;

  for (const shot of nonHeaves) {
    const t = shot.complex_shot_type;
    if (SPOT_UP.has(t)) {
      spotUp++;
    } else if (t === ComplexShotType.StandstillLayup) {
      // no assist = self-created; assist or assist opportunity = cut/off-ball
      if (shot.assisted || shot.ast_opp) cutOffBall++;
      else selfCreated++;
    } else if (SELF_CREATED.has(t)) {
      selfCreated++;
    } else if (CUT_OFF_BALL.has(t)) {
      cutOffBall++;
    } else if (POST_UP.has(t)) {
      postUp++;
    }
  }

  const fgm = nonHeaves.filter((s) => s.outcome).length;
  const threeMade = nonHeaves.filter(
    (s) => s.is_three_pointer && s.outcome
  ).length;

  return {
    spotUpRate: spotUp / fga,
    selfCreatedRate: selfCreated / fga,
    cutOffBallRate: cutOffBall / fga,
    postUpRate: postUp / fga,
    eFGPercent: (fgm + 0.5 * threeMade) / fga
  };
}
