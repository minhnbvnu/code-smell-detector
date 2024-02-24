function isClick(start, end, options = {}) {
  const fineTolerance = (options.fineTolerance != null) ? options.fineTolerance : FINE_TOLERANCE;
  const grossTolerance = (options.grossTolerance != null) ? options.grossTolerance : GROSS_TOLERANCE;
  const interval = (options.interval != null) ? options.interval : INTERVAL;

  start.point = start.point || end.point;
  start.time = start.time || end.time;
  const moveDistance = euclideanDistance(start.point, end.point);

  return moveDistance < fineTolerance ||
    (moveDistance < grossTolerance && (end.time - start.time) < interval);
}