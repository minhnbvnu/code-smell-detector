function makeCircleTwoPoints(points, p, q) {
  const temp = makeDiameter(p, q);
  let containsAll = true;

  for (let i = 0; i < points.length; i++) {
    containsAll = containsAll && isInCircle(temp, points[i]);
  }

  if (containsAll) {
    return temp;
  }

  let left = null;
  let right = null;
  for (let i = 0; i < points.length; i++) {
    const r = points[i];
    const cross = crossProduct(p.x, p.y, q.x, q.y, r.x, r.y);
    const c = makeCircumcircle(p, q, r);
    if (c == null) {
      // eslint-disable-next-line no-continue
      continue;
    } else if (cross > 0 && (left == null || crossProduct(p.x, p.y, q.x, q.y, c.x, c.y) > crossProduct(p.x, p.y, q.x, q.y, left.x, left.y))) {
      left = c;
    } else if (cross < 0 && (right == null || crossProduct(p.x, p.y, q.x, q.y, c.x, c.y) < crossProduct(p.x, p.y, q.x, q.y, right.x, right.y))) {
      right = c;
    }
  }

  return right == null || left != null && left.r <= right.r ? left : right;
}