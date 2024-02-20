function getPointProgressOnLine(x, y, p1, p2) {
  const segment = distance(p1, p2);
  const toStart = distance(p1, { x, y });
  const toEnd = distance(p2, { x, y });
  if (toStart > segment || toEnd > segment) {
    // Point is outside the line segment, so clamp it to the nearest end
    return toStart > toEnd ? 1 : 0;
  }
  return toStart / segment;
}