const SVG_WIDTH = 800;
const SVG_HEIGHT = 752;
const MARGIN_X = 50;
const MARGIN_Y = 50;

const COURT_LEFT = MARGIN_X; // 50 — left sideline
const COURT_RIGHT = SVG_WIDTH - MARGIN_X; // 750 — right sideline
const COURT_TOP = MARGIN_Y; // 50 — half court line
const COURT_BOTTOM = 702; // baseline

// NBA court dimenions in feet
const COURT_WIDTH_FT = 50;
const COURT_LENGTH_FT = 47;

const PX_PER_FT_X = (COURT_RIGHT - COURT_LEFT) / COURT_WIDTH_FT;
const PX_PER_FT_Y = (COURT_BOTTOM - COURT_TOP) / COURT_LENGTH_FT;

/**
 * Converts shot coordinates from data to SVG pixel coordinates
 * SVG half court is rotated 90 degrees counterclockwise from data coordinates
 *
 * @param dataX (baseline to half court) maps to SVG vertical (y)
 * @param dataY (sideline to sideline) maps to SVG horizontal (x)
 * @returns {x, y} in SVG pixel coordinates
 */
export function toSVGCoords(
  dataX: number,
  dataY: number
): { x: number; y: number } {
  // dataY = sideline to sideline → SVG horizontal
  const svgX =
    COURT_LEFT + (COURT_RIGHT - COURT_LEFT) / 2 + dataY * PX_PER_FT_X;

  // dataX = depth, ranges from 0 (half court) to -47 (baseline) → SVG vertical
  // dataX=0 → COURT_TOP (y=50), dataX=-47 → COURT_BOTTOM (y=702)
  const svgY =
    COURT_TOP +
    (Math.abs(dataX) / COURT_LENGTH_FT) * (COURT_BOTTOM - COURT_TOP);

  return { x: svgX, y: svgY };
}
