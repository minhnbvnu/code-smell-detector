function findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {

  var t1 = 1 - t, t13 = Math.pow(t1, 3), t12 = Math.pow(t1, 2), t2 = t * t,
    t3 = t2 * t, x = t13 * p1x + t12 * 3 * t * c1x + t1 * 3 * t * t * c2x +
    t3 * p2x, y = t13 * p1y + t12 * 3 * t * c1y + t1 * 3 * t * t * c2y +
    t3 * p2y, mx = p1x + 2 * t * (c1x - p1x) + t2 * (c2x - 2 * c1x + p1x),
    my = p1y + 2 * t * (c1y - p1y) + t2 * (c2y - 2 * c1y + p1y),
    nx = c1x + 2 * t * (c2x - c1x) + t2 * (p2x - 2 * c2x + c1x),
    ny = c1y + 2 * t * (c2y - c1y) + t2 * (p2y - 2 * c2y + c1y),
    ax = t1 * p1x + t * c1x, ay = t1 * p1y + t * c1y,
    cx = t1 * c2x + t * p2x, cy = t1 * c2y + t * p2y,
    alpha = (90 - Math.atan2(mx - nx, my - ny) * 180 / Math.PI);

  if (mx > nx || my < ny) { alpha += 180; }

  return { x: x, y: y, m: { x: mx, y: my }, n: { x: nx, y: ny },
    start: { x: ax, y: ay }, end: { x: cx, y: cy }, alpha: alpha
  };
}