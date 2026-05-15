"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { ShotMetrics } from "@/lib/shotMetrics";

type ProfileChartProps = {
  playerMetrics: ShotMetrics;
  rotMetrics: ShotMetrics;
  playerName: string;
};

const fmt = (v: number) => `${(v * 100).toFixed(1)}%`;

const CHART_DATA = (p: ShotMetrics, r: ShotMetrics) => [
  // Shot selection
  { metric: "Rim Rate", player: p.rimRate, rot: r.rimRate },
  { metric: "Mid-Range Rate", player: p.midRangeRate, rot: r.midRangeRate },
  { metric: "3PT Rate", player: p.threePtRate, rot: r.threePtRate },
  // Efficiency
  { metric: "eFG%", player: p.eFGPercent, rot: r.eFGPercent },
  // Creation
  { metric: "Assisted Rate", player: p.assistedRate, rot: r.assistedRate },
  { metric: "C&S Rate", player: p.catchAndShootRate, rot: r.catchAndShootRate }
];

export default function ProfileChart({
  playerMetrics,
  rotMetrics,
  playerName
}: ProfileChartProps) {
  const data = CHART_DATA(playerMetrics, rotMetrics);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        data={data}
        margin={{ left: 16, right: 32, top: 8, bottom: 8 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis
          type="number"
          domain={[0, 1]}
          tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          type="category"
          dataKey="metric"
          width={120}
          tick={{ fontSize: 12 }}
        />
        <Tooltip formatter={(v) => (typeof v === "number" ? fmt(v) : v)} />
        <Legend />
        <Bar
          dataKey="player"
          name={playerName}
          fill="#3B82F6"
          radius={[0, 3, 3, 0]}
        />
        <Bar
          dataKey="rot"
          name="Rest of Team"
          fill="#9CA3AF"
          radius={[0, 3, 3, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
