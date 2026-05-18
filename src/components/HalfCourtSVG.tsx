"use client";

import {
  SVG_WIDTH,
  SVG_HEIGHT,
  COURT_LEFT,
  COURT_RIGHT,
  COURT_TOP,
  COURT_BOTTOM,
  COURT_CENTER_X,
  KEY_X,
  KEY_Y,
  KEY_WIDTH,
  KEY_HEIGHT,
  FT_CIRCLE_RADIUS,
  BACKBOARD_Y,
  BACKBOARD_HALF_WIDTH,
  RIM_Y,
  RIM_RADIUS,
  RESTRICTED_RADIUS,
  THREE_CORNER_X,
  THREE_CORNER_Y,
  THREE_ARC_RADIUS
} from "@/lib/courtUtils";

type HalfCourtSVGProps = {
  svgRef?: React.RefObject<SVGSVGElement | null>;
  playerName?: string;
  sublabel?: string;
};

export default function HalfCourtSVG({
  svgRef,
  playerName = "PLAYER",
  sublabel
}: HalfCourtSVGProps) {
  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: "block" }}
    >
      <defs>
        <style>{`
          .bg { fill: #F7FAFC; }
          .court-line { stroke: #1A202C; stroke-width: 2; fill: none; stroke-linecap: round; opacity: 0.8; }
          .court-line-thicker { stroke: #1A202C; stroke-width: 3; fill: none; opacity: 0.9; }
          .title-main { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 28px; fill: #1A202C; font-weight: 700; letter-spacing: 2px; text-anchor: middle; }
          .legend-label { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 18px; fill: #4A5568; }
          .sublabel { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; fill: #718096; text-anchor: middle; }
        `}</style>
      </defs>

      {/* Background */}
      <rect className="bg" width={SVG_WIDTH} height={SVG_HEIGHT} />

      {/* Title */}
      <text x={COURT_CENTER_X} y={35} className="title-main">
        {playerName}
      </text>

      {/* Stats */}
      {sublabel && (
        <text x={COURT_CENTER_X} y={60} className="sublabel">
          {sublabel}
        </text>
      )}

      {/* Outer Boundary */}
      <path
        d={`M ${COURT_LEFT},${COURT_TOP} L ${COURT_LEFT},${COURT_BOTTOM} L ${COURT_RIGHT},${COURT_BOTTOM} L ${COURT_RIGHT},${COURT_TOP}`}
        className="court-line-thicker"
      />

      {/* Key */}
      <rect
        x={KEY_X}
        y={KEY_Y}
        width={KEY_WIDTH}
        height={KEY_HEIGHT}
        className="court-line"
      />

      {/* Free Throw Circle — solid top */}
      <path
        d={`M ${COURT_CENTER_X - FT_CIRCLE_RADIUS},${KEY_Y} A ${FT_CIRCLE_RADIUS},${FT_CIRCLE_RADIUS} 0 0,1 ${COURT_CENTER_X + FT_CIRCLE_RADIUS},${KEY_Y}`}
        className="court-line"
      />

      {/* Free Throw Circle — dashed bottom */}
      <path
        d={`M ${COURT_CENTER_X - FT_CIRCLE_RADIUS},${KEY_Y} A ${FT_CIRCLE_RADIUS},${FT_CIRCLE_RADIUS} 0 0,0 ${COURT_CENTER_X + FT_CIRCLE_RADIUS},${KEY_Y}`}
        className="court-line"
        strokeDasharray="6,6"
      />

      {/* Backboard */}
      <line
        x1={COURT_CENTER_X - BACKBOARD_HALF_WIDTH}
        y1={BACKBOARD_Y}
        x2={COURT_CENTER_X + BACKBOARD_HALF_WIDTH}
        y2={BACKBOARD_Y}
        className="court-line"
      />

      {/* Rim */}
      <circle
        cx={COURT_CENTER_X}
        cy={RIM_Y}
        r={RIM_RADIUS}
        className="court-line"
      />

      {/* Restricted Area */}
      <path
        d={`M ${COURT_CENTER_X - RESTRICTED_RADIUS},${RIM_Y} A ${RESTRICTED_RADIUS},${RESTRICTED_RADIUS} 0 0,1 ${COURT_CENTER_X + RESTRICTED_RADIUS},${RIM_Y}`}
        className="court-line"
      />

      {/* Legend */}
      <circle cx={320} cy={730} r={7} fill="rgba(59, 130, 246, 0.65)" />
      <text x={334} y={735} className="legend-label">
        Made
      </text>
      <circle cx={430} cy={730} r={7} fill="rgba(239, 68, 68, 0.6)" />
      <text x={444} y={735} className="legend-label">
        Missed
      </text>

      {/* 3-Point Line */}
      <path
        d={`M ${THREE_CORNER_X},${COURT_BOTTOM} L ${THREE_CORNER_X},${THREE_CORNER_Y} A ${THREE_ARC_RADIUS},${THREE_ARC_RADIUS} 0 0,1 ${SVG_WIDTH - THREE_CORNER_X},${THREE_CORNER_Y} L ${SVG_WIDTH - THREE_CORNER_X},${COURT_BOTTOM}`}
        className="court-line-thicker"
      />
    </svg>
  );
}
