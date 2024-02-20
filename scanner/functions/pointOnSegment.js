function pointOnSegment (point, segment) {
  point = roundPoint(point);
  segment[0] = roundPoint(segment[0]);
  segment[1] = roundPoint(segment[1]);
  return (
    point[0] >= Math.min(segment[0][0], segment[1][0]) &&
    point[0] <= Math.max(segment[1][0], segment[0][0]) &&
    point[1] >= Math.min(segment[0][1], segment[1][1]) &&
    point[1] <= Math.max(segment[0][1], segment[1][1])
  );
}