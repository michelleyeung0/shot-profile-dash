export default function HalfCourtSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 600"
      width="100%"
      height="100%"
    >
      <defs></defs>

      {/* Background */}
      <rect className="bg" width={800} height={600} />

      {/* Typography / Header */}
      <text x={400} y={50} className="title-main">
        SHOT MAP
      </text>

      {/* Basketball Court Layout */}
      {/* Origin: x=50 is left sideline, x=750 is right sideline */}
      {/* Origin: y=580 is baseline, y=120 is half court line */}
      <g id="court">
        {/* Outer Boundary */}
        <path
          d="M 50,120 L 50,580 L 750,580 L 750,120"
          className="court-line-thicker"
        />

        {/* Key - 16ft wide (224px), 19ft long (190px) from baseline */}
        {/* Center x=400, so x=288 to x=512 */}
        <rect x={288} y={390} width={224} height={190} className="court-line" />

        {/* Free Throw Circle - radius 6ft = 60px, centered at y=390 */}
        {/* Solid top half */}
        <path d="M 340,390 A 60,60 0 0,1 460,390" className="court-line" />

        {/* Dashed bottom half */}
        <path
          d="M 340,390 A 60,60 0 0,0 460,390"
          className="court-line"
          strokeDasharray="6,6"
        />

        {/* Backboard - 6ft wide (84px), 4ft from baseline = y=540 */}
        <line x1={358} y1={540} x2={442} y2={540} className="court-line" />

        {/* Rim - 5.25ft from baseline = y=527, radius ~7px */}
        <circle cx={400} cy={527} r={9} className="court-line" />

        {/* Restricted Area - 4ft radius = 40px, centered on rim */}
        <path d="M 360,527 A 40,40 0 0,1 440,527" className="court-line" />

        {/* 3-Point Line */}
        {/* Corners: 3ft from sideline = x=90 and x=710 */}
        {/* Corner height: 14ft from baseline = y=440 */}
        {/* Arc radius: 23.75ft = 238px, centered on rim at (400, 527) */}
        <path
          d="M 90,580 L 90,440 A 238,238 0 0,1 710,440 L 710,580"
          className="court-line-thicker"
        />
      </g>
    </svg>
  );
}
