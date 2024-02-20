function makeCircumcircle(p0, p1, p2) {
  // Mathematical algorithm from Wikipedia: Circumscribed circle
  const ax = p0.x;
  const ay = p0.y;
  const bx = p1.x;
  const by = p1.y;
  const cx = p2.x;
  const cy = p2.y;
  const d = (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by)) * 2;

  if (d === 0) {
    return null;
  }

  const x = ((ax * ax + ay * ay) * (by - cy)
    + (bx * bx + by * by) * (cy - ay)
    + (cx * cx + cy * cy) * (ay - by)) / d;
  const y = ((ax * ax + ay * ay) * (cx - bx)
    + (bx * bx + by * by) * (ax - cx)
    + (cx * cx + cy * cy) * (bx - ax)) / d;

  return { x, y, r: distance(x, y, ax, ay) };
}