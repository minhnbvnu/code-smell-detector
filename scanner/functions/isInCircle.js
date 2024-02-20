function isInCircle(c, p) {
  return c != null && distance(p.x, p.y, c.x, c.y) < c.r + EPSILON;
}