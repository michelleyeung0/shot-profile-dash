import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase
    .from("shots")
    .select("*")
    .neq("shot_type", "heave")
    .range(0, 8999); // ! we can do this because we have a fixed data set

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}
