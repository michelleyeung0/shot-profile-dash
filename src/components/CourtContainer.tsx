"use client";

import { useRef, useEffect, useState } from "react";
import { Shot, ShotType, ContestLevel } from "@/types/shot";
import HalfCourtSVG from "./HalfCourtSVG";
import ShotCanvas from "./ShotCanvas";

type CourtContainerProps = {
  shots: Shot[];
  playerName?: string;
  sublabel?: string;
  showTooltips?: boolean;
};

const SHOT_TYPE_LABELS: Record<ShotType, string> = {
  [ShotType.Jumper]: "Jumper",
  [ShotType.Post]: "Post",
  [ShotType.Floater]: "Floater",
  [ShotType.Layup]: "Layup",
  [ShotType.Heave]: "Heave",
};

const CONTEST_LABELS: Record<ContestLevel, string> = {
  [ContestLevel.Uncontested]: "Uncontested",
  [ContestLevel.LightlyContested]: "Lightly Contested",
  [ContestLevel.HeavilyContested]: "Heavily Contested",
};

export default function CourtContainer({
  shots,
  playerName,
  sublabel,
  showTooltips,
}: CourtContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [courtDimensions, setCourtDimensions] = useState({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  });
  const [hoveredShot, setHoveredShot] = useState<Shot | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function updateDimensions() {
      const container = containerRef.current;
      if (!container) return;

      const { width, height } = container.getBoundingClientRect();

      const aspectRatio = 800 / 752;
      const containerAspectRatio = width / height;

      let courtWidth, courtHeight, courtLeft, courtTop;

      if (containerAspectRatio > aspectRatio) {
        courtHeight = height;
        courtWidth = height * aspectRatio;
        courtLeft = (width - courtWidth) / 2;
        courtTop = 0;
      } else {
        courtWidth = width;
        courtHeight = width / aspectRatio;
        courtLeft = 0;
        courtTop = (height - courtHeight) / 2;
      }

      setCourtDimensions({
        width: courtWidth,
        height: courtHeight,
        left: courtLeft,
        top: courtTop,
      });
    }

    updateDimensions();

    const observer = new ResizeObserver(() => updateDimensions());
    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const activeHoveredShot = showTooltips ? hoveredShot : null;

  function handleHover(shot: Shot | null, canvasX: number, canvasY: number) {
    setHoveredShot(shot);
    if (shot) {
      setTooltipPos({
        x: courtDimensions.left + canvasX,
        y: courtDimensions.top + canvasY,
      });
    }
  }

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <HalfCourtSVG
        svgRef={svgRef}
        playerName={playerName}
        sublabel={sublabel}
      />
      <ShotCanvas
        shots={shots}
        courtDimensions={courtDimensions}
        showTooltips={showTooltips}
        hoveredShot={activeHoveredShot}
        onHover={handleHover}
      />
      {activeHoveredShot && (
        <div
          style={{ left: tooltipPos.x + 12, top: tooltipPos.y - 12 }}
          className="absolute z-10 pointer-events-none bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg flex flex-col gap-1 min-w-[140px]"
        >
          <div className="text-gray-300">
            {SHOT_TYPE_LABELS[activeHoveredShot.shot_type]}
          </div>
          <div className="text-gray-300">
            {CONTEST_LABELS[activeHoveredShot.contest_level]}
          </div>
          <div className="text-gray-300">
            {activeHoveredShot.assisted ? "Assisted" : "Unassisted"}
          </div>
          <div className="text-gray-300">
            {activeHoveredShot.catch_and_shoot
              ? "Catch & shoot"
              : `${activeHoveredShot.dribbles_before} dribble${activeHoveredShot.dribbles_before !== 1 ? "s" : ""}`}
          </div>
        </div>
      )}
    </div>
  );
}
