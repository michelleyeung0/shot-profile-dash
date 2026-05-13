import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase
    .from("shots")
    .select(
      "shooter_name, outcome, shot_type, complex_shot_type, contest_level, assisted, catch_and_shoot, dribbles_before, blocked, fouled",
    );

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
