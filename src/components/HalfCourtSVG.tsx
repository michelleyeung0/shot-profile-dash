type HalfCourtSVGProps = {
  svgRef?: React.RefObject<SVGSVGElement | null>;
  label?: string;
};

export default function HalfCourtSVG({ svgRef, label = "SHOT MAP" }: HalfCourtSVGProps) {
  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 752"
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
        `}</style>
      </defs>

      {/* Background */}
      <rect className="bg" width={800} height={752} />

      {/* Title */}
      <text x={400} y={35} className="title-main">
        {label}
      </text>

      {/* Outer Boundary */}
      <path
        d="M 50,50 L 50,702 L 750,702 L 750,50"
        className="court-line-thicker"
      />

      {/* Half Court Line */}
      {/* <line x1={50} y1={50} x2={750} y2={50} className="court-line-thicker" /> */}

      {/* Key - 16ft wide = 224px, 19ft long = 263px */}
      {/* Center x=400, so x=288 to x=512 */}
      <rect x={288} y={439} width={224} height={263} className="court-line" />

      {/* Free Throw Circle - radius 6ft = 83px, centered at y=439 */}
      {/* Solid top */}
      <path d="M 317,439 A 83,83 0 0,1 483,439" className="court-line" />

      {/* Dashed bottom */}
      <path
        d="M 317,439 A 83,83 0 0,0 483,439"
        className="court-line"
        strokeDasharray="6,6"
      />

      {/* Backboard - 6ft wide = 84px, 4ft from baseline = 55px → y=647 */}
      <line x1={358} y1={647} x2={442} y2={647} className="court-line" />

      {/* Rim - 5.25ft from baseline = 73px → cy=629, radius 9in = ~11px */}
      <circle cx={400} cy={629} r={11} className="court-line" />

      {/* Restricted Area - 4ft radius = 55px */}
      <path d="M 345,629 A 55,55 0 0,1 455,629" className="court-line" />

      {/* Legend */}
      <circle cx={320} cy={730} r={7} fill="rgba(59, 130, 246, 0.65)" />
      <text x={334} y={735} className="legend-label">Made</text>
      <circle cx={430} cy={730} r={7} fill="rgba(239, 68, 68, 0.6)" />
      <text x={444} y={735} className="legend-label">Missed</text>

      {/* 3-Point Line */}
      {/* Corners: 3ft from sideline = 42px → x=92 and x=708 */}
      {/* Corner height: 14ft from baseline = 194px → y=508 */}
      {/* Arc radius: 23.75ft = 332px, centered on rim */}
      <path
        d="M 92,702 L 92,508 A 332,332 0 0,1 708,508 L 708,702"
        className="court-line-thicker"
      />
    </svg>
  );
}
