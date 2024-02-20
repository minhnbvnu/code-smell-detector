function makeDiameter(p0, p1) {
  return {
    x: (p0.x + p1.x) / 2,
    y: (p0.y + p1.y) / 2,
    r: distance(p0.x, p0.y, p1.x, p1.y) / 2,
  };
}