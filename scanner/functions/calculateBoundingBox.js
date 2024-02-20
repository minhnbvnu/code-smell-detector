function calculateBoundingBox(mode, x1, y1, cx1, cy1, cx2, cy2, x2, y2) {
  if (mode === BoundingMode.STANDARD) {
    return canculateStandardBoundingBox(x1, y1, cx1, cy1, cx2, cy2, x2, y2);
  } else if (mode === BoundingMode.STRAIGHTEN) {
    return calculateStraightenedBoundingBox(x1, y1, cx1, cy1, cx2, cy2, x2, y2);
  } else {
    return null;
  }
}