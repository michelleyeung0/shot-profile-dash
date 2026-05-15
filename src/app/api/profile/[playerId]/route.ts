import { computeMetrics } from "@/lib/shotMetrics";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ playerId: string }> }
) {
  const { playerId } = await params;
  const columns =
    "outcome, is_three_pointer, complex_shot_type, assisted, ast_opp";

  const [playerRes, rotRes] = await Promise.all([
    // Get the specified player's shots
    supabase.from("shots").select(columns).eq("shooter_id", playerId),

    // Get all of the team's shots, excluding the specified player's shots
    supabase.from("shots").select(columns).neq("shooter_id", playerId)
  ]);

  if (playerRes.error)
    return NextResponse.json(
      { error: playerRes.error.message },
      { status: 500 }
    );
  if (rotRes.error)
    return NextResponse.json({ error: rotRes.error.message }, { status: 500 });

  const player = computeMetrics(playerRes.data ?? []);
  const rot = computeMetrics(rotRes.data ?? []);

  if (!player || !rot)
    return NextResponse.json({ error: "Insufficient data" }, { status: 404 });

  return NextResponse.json({ player, rot });
}
