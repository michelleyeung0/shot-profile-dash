"use client";

import { useEffect, useRef } from "react";
import { Shot } from "@/types/shot";
import { toSVGCoords } from "@/lib/courtUtils";

type ShotCanvasProps = {
  shots: Shot[];
  courtDimensions: { width: number; height: number; left: number; top: number };
};

export default function ShotCanvas({
  shots,
  courtDimensions,
}: ShotCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || courtDimensions.width === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height, left, top } = courtDimensions;

    canvas.width = width;
    canvas.height = height;

    const scaleX = width / 800;
    const scaleY = height / 752;

    ctx.clearRect(0, 0, width, height);

    shots.forEach((shot) => {
      const { x, y } = toSVGCoords(shot.x, shot.y);
      ctx.beginPath();
      ctx.arc(x * scaleX, y * scaleY, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(51, 65, 85, 0.5)";
      ctx.fill();
    });
  }, [shots, courtDimensions]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: courtDimensions.top,
        left: courtDimensions.left,
        width: courtDimensions.width,
        height: courtDimensions.height,
        pointerEvents: "none",
      }}
    />
  );
}
