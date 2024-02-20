function makeCircleOnePoint(points, p) {
  let c = { x: p.x, y: p.y, r: 0 };
  for (let i = 0; i < points.length; i++) {
    const q = points[i];
    if (!isInCircle(c, q)) {
      if (c.r === 0) {
        c = makeDiameter(p, q);
      } else {
        c = makeCircleTwoPoints(points.slice(0, i + 1), p, q);
      }
    }
  }
  return c;
}