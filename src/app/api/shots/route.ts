import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  // ! we wouldn't do this for a real app, but since we know we have a limited dataset, this is faster than paginating and merging results on the frontend
  const ranges = [
    [0, 999],
    [1000, 1999],
    [2000, 2999],
    [3000, 3999],
    [4000, 4999],
    [5000, 5999],
    [6000, 6999],
    [7000, 7999],
    [8000, 8999],
  ];

  const results = await Promise.all(
    ranges.map(
      ([from, to]) =>
        supabase
          .from("shots")
          .select("*")
          .neq("shot_type", "heave")
          .range(from, to)
      // TODO: clean up test query
      // .from("shots")
      // .select("*")
      // .eq("x", -28.65)
      // .eq("y", -0.26)
      // .range(from, to)
    )
  );

  for (const result of results) {
    if (result.error)
      return NextResponse.json(
        { error: result.error.message },
        { status: 500 }
      );
  }

  const data = results.flatMap((result) => result.data || []);

  return NextResponse.json(data);
}
