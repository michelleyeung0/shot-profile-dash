export const SVG_WIDTH = 800;
export const SVG_HEIGHT = 752;
export const MARGIN_X = 50;
export const MARGIN_Y = 50;

export const COURT_LEFT = MARGIN_X; // 50 — left sideline
export const COURT_RIGHT = SVG_WIDTH - MARGIN_X; // 750 — right sideline
export const COURT_TOP = MARGIN_Y; // 50 — half court line
export const COURT_BOTTOM = 702; // baseline
export const COURT_CENTER_X = (COURT_LEFT + COURT_RIGHT) / 2; // 400

const COURT_WIDTH_FT = 50;
const COURT_LENGTH_FT = 47;

export const PX_PER_FT_X = (COURT_RIGHT - COURT_LEFT) / COURT_WIDTH_FT;
export const PX_PER_FT_Y = (COURT_BOTTOM - COURT_TOP) / COURT_LENGTH_FT;

const ft = (feet: number, axis: "x" | "y") =>
  Math.round(feet * (axis === "x" ? PX_PER_FT_X : PX_PER_FT_Y));

// Key
export const KEY_WIDTH = ft(16, "x");
export const KEY_HEIGHT = ft(19, "y");
export const KEY_X = COURT_CENTER_X - KEY_WIDTH / 2;
export const KEY_Y = COURT_BOTTOM - KEY_HEIGHT;

// Free throw circle
export const FT_CIRCLE_RADIUS = ft(6, "y");

// Backboard
export const BACKBOARD_Y = COURT_BOTTOM - ft(4, "y");
export const BACKBOARD_HALF_WIDTH = ft(3, "x");

// Rim
export const RIM_Y = COURT_BOTTOM - ft(5.25, "y");
export const RIM_RADIUS = ft(0.75, "x");

// Restricted area
export const RESTRICTED_RADIUS = ft(4, "y");

// 3-point line
export const THREE_CORNER_X = COURT_LEFT + ft(3, "x");
export const THREE_CORNER_Y = COURT_BOTTOM - ft(14, "y");
export const THREE_ARC_RADIUS = ft(23.75, "x");

/**
 * Converts shot coordinates from data to SVG pixel coordinates because
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
  const svgX = COURT_CENTER_X + dataY * PX_PER_FT_X;
  const svgY =
    COURT_TOP +
    (Math.abs(dataX) / COURT_LENGTH_FT) * (COURT_BOTTOM - COURT_TOP);
  return { x: svgX, y: svgY };
}
