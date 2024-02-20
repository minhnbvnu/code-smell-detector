function rectContainsPoint({
  x,
  y
}, rect) {
  const [top, right, bottom, left] = rectToBox(rect);
  return left <= x && x <= right && top <= y && y <= bottom;
}