function computePosition({ anchor, floating, placement }) {
  let rects = getElementRects({ anchor, floating });
  let { x, y } = computeCoordsFromPlacement(rects, placement);
  return { x, y };
}