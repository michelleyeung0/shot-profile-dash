import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase
    .from("shots")
    .select("shooter_id, shooter_name")
    .order("shooter_name", { ascending: true });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  const unique = Array.from(
    new Map(data.map((p) => [p.shooter_id, p])).values()
  );

  return NextResponse.json(unique);
}
