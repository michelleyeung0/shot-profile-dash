"use client";

import { useRef, useEffect, useState } from "react";
import { Shot } from "@/types/shot";
import HalfCourtSVG from "./HalfCourtSVG";
import ShotCanvas from "./ShotCanvas";

type CourtContainerProps = {
  shots: Shot[];
};

export default function CourtContainer({ shots }: CourtContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [courtDimensions, setCourtDimensions] = useState({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  });

  useEffect(() => {
    function updateDimensions() {
      const container = containerRef.current;
      if (!container) return;

      const { width, height } = container.getBoundingClientRect();

      const aspectRatio = 800 / 752;
      const containerAspectRatio = width / height;

      let courtWidth, courtHeight, courtLeft, courtTop;

      if (containerAspectRatio > aspectRatio) {
        // Container is wider than court ratio — constrained by height
        courtHeight = height;
        courtWidth = height * aspectRatio;
        courtLeft = (width - courtWidth) / 2;
        courtTop = 0;
      } else {
        // Container is taller than court ratio — constrained by width
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

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <HalfCourtSVG svgRef={svgRef} />
      <ShotCanvas shots={shots} courtDimensions={courtDimensions} />
    </div>
  );
}
