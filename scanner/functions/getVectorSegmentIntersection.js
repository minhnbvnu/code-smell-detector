function getVectorSegmentIntersection (point1, vector1, segment) {
  var
    point2 = segment[0],
    vector2 = [segment[1][0] - segment[0][0], segment[1][1] - segment[0][1]],
    n1, n2, m1, m2, xy;

  if (vector1[0] === 0 && vector2[0] === 0) {
    return;
  }

  if (vector1[0] !== 0) {
    m1 = vector1[1] / vector1[0];
    n1 = point1[1] - m1 * point1[0];
  }

  if (vector2[0] !== 0) {
    m2 = vector2[1] / vector2[0];
    n2 = point2[1] - m2 * point2[0];
  }

  if (vector1[0] === 0) {
    xy = [point1[0], m2 * point1[0] + n2];
    if (pointOnSegment(xy, segment)) {
      return xy;
    }
  }

  if (vector2[0] === 0) {
    xy = [point2[0], m1 * point2[0] + n1];
    if (pointOnSegment(xy, segment)) {
      return xy;
    }
  }

  if (m1 === m2) {
    return;
  }

  var x = (n2 - n1) / (m1 - m2);
  xy = [x, m1 * x + n1];
  if (pointOnSegment(xy, segment)) {
    return xy;
  }
}