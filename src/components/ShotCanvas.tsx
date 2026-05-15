"use client";

import { useEffect, useRef } from "react";
import { Shot } from "@/types/shot";
import { toSVGCoords } from "@/lib/courtUtils";

type ShotCanvasProps = {
  shots: Shot[];
  courtDimensions: { width: number; height: number; left: number; top: number };
  showTooltips?: boolean;
  hoveredShot?: Shot | null;
  onHover?: (shot: Shot | null, canvasX: number, canvasY: number) => void;
};

export default function ShotCanvas({
  shots,
  courtDimensions,
  showTooltips,
  hoveredShot,
  onHover
}: ShotCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || courtDimensions.width === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = courtDimensions;

    canvas.width = width;
    canvas.height = height;

    const scaleX = width / 800;
    const scaleY = height / 752;

    ctx.clearRect(0, 0, width, height);

    shots.forEach((shot) => {
      if (hoveredShot && shot.id === hoveredShot.id) return;
      const { x, y } = toSVGCoords(shot.x, shot.y);
      ctx.beginPath();
      ctx.arc(x * scaleX, y * scaleY, 3, 0, Math.PI * 2);
      ctx.fillStyle = shot.outcome
        ? "rgba(59, 130, 246, 0.65)"
        : "rgba(239, 68, 68, 0.6)";
      ctx.fill();
    });

    if (hoveredShot) {
      const { x, y } = toSVGCoords(hoveredShot.x, hoveredShot.y);
      const cx = x * scaleX;
      const cy = y * scaleY;
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fillStyle = hoveredShot.outcome
        ? "rgba(59, 130, 246, 0.9)" // made shot
        : "rgba(239, 68, 68, 0.9)"; // missed shot
      ctx.fill();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }, [shots, courtDimensions, hoveredShot]);

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!onHover || !showTooltips) return;
    const canvas = canvasRef.current;
    if (!canvas || courtDimensions.width === 0) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const scaleX = courtDimensions.width / 800;
    const scaleY = courtDimensions.height / 752;

    const HIT_RADIUS = 8;
    let closest: Shot | null = null;
    let closestDist = HIT_RADIUS;

    shots.forEach((shot) => {
      const { x, y } = toSVGCoords(shot.x, shot.y);
      const dx = mouseX - x * scaleX;
      const dy = mouseY - y * scaleY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < closestDist) {
        closestDist = dist;
        closest = shot;
      }
    });

    onHover(closest, mouseX, mouseY);
  }

  function handleMouseLeave() {
    onHover?.(null, 0, 0);
  }

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "absolute",
        top: courtDimensions.top,
        left: courtDimensions.left,
        width: courtDimensions.width,
        height: courtDimensions.height,
        pointerEvents: showTooltips ? "auto" : "none",
        cursor: showTooltips ? "crosshair" : "default"
      }}
    />
  );
}
