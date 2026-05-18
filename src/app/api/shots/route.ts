import { supabase } from "@/lib/supabase";
import { ShotType } from "@/types/shot";
import { Outcome, AssistedFilter } from "@/types/filters";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const player = url.searchParams.get("player");

    if (player) {
      // Parse filter parameters from query string
      const shotTypesParam = url.searchParams.get("shotTypes");
      const shotTypes = shotTypesParam ? shotTypesParam.split(",") : [];
      const outcome = url.searchParams.get("outcome") ?? Outcome.All;
      const contestLevelsParam = url.searchParams.get("contestLevels");
      const contestLevels = contestLevelsParam
        ? contestLevelsParam.split(",")
        : [];
      const assisted = url.searchParams.get("assisted") ?? AssistedFilter.All;

      // Build the query with all filters applied
      let query = supabase
        .from("shots")
        .select("*")
        .neq("shot_type", ShotType.Heave)
        .eq("shooter_id", player);

      // Apply shot type filters
      if (shotTypes.length > 0) {
        query = query.in("shot_type", shotTypes);
      }

      // Apply outcome filter
      if (outcome === Outcome.Made) {
        query = query.eq("outcome", true);
      } else if (outcome === Outcome.Missed) {
        query = query.eq("outcome", false);
      }

      // Apply contest level filters
      if (contestLevels.length > 0) {
        query = query.in("contest_level", contestLevels);
      }

      // Apply assisted filter
      if (assisted === AssistedFilter.Assisted) {
        query = query.eq("assisted", true);
      } else if (assisted === AssistedFilter.Unassisted) {
        query = query.eq("assisted", false);
      }

      const { data: shots, error: shotsError } = await query;

      if (shotsError)
        return NextResponse.json(
          { error: shotsError.message },
          { status: 500 }
        );

      // Compute metrics from the filtered shots array
      const fga = shots?.length ?? 0;
      const fgm = shots?.filter((s) => s.outcome).length ?? 0;
      const threesMade =
        shots?.filter((s) => s.outcome && s.is_three_pointer).length ?? 0;

      const fgPercent = fga > 0 ? Number(((fgm / fga) * 100).toFixed(1)) : 0;
      const eFGPercent =
        fga > 0
          ? Number((((fgm + 0.5 * threesMade) / fga) * 100).toFixed(1))
          : 0;

      return NextResponse.json({
        metrics: {
          fgm,
          fga,
          threes_made: threesMade,
          fg_percent: fgPercent,
          efg_percent: eFGPercent
        },
        shots
      });
    }

    // No player filter: return all shots (existing behavior)
    const { data, error } = await supabase
      .from("shots")
      .select("*")
      .neq("shot_type", ShotType.Heave);
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
