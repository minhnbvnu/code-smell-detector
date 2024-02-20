function getSqSegDist (p, a, b) {
  let
    x = a[0], y = a[1],
    bx = b[0], by = b[1],
    px = p[0], py = p[1],
    dx = bx - x,
    dy = by - y;

  if (dx !== 0 || dy !== 0) {
    const t = ((px - x) * dx + (py - y) * dy) / (dx * dx + dy * dy);

    if (t > 1) {
      x = bx;
      y = by;
    } else if (t > 0) {
      x += dx * t;
      y += dy * t;
    }
  }

  dx = px - x;
  dy = py - y;

  return dx * dx + dy * dy;
}