function fastPathSegment(ctx, line, segment, params) {
  const points = line.points;
  const {count, start, ilen} = pathVars(points, segment, params);
  const {move = true, reverse} = params || {};
  let avgX = 0;
  let countX = 0;
  let i, point, prevX, minY, maxY, lastY;

  const pointIndex = (index) => (start + (reverse ? ilen - index : index)) % count;
  const drawX = () => {
    if (minY !== maxY) {
      // Draw line to maxY and minY, using the average x-coordinate
      ctx.lineTo(avgX, maxY);
      ctx.lineTo(avgX, minY);
      // Line to y-value of last point in group. So the line continues
      // from correct position. Not using move, to have solid path.
      ctx.lineTo(avgX, lastY);
    }
  };

  if (move) {
    point = points[pointIndex(0)];
    ctx.moveTo(point.x, point.y);
  }

  for (i = 0; i <= ilen; ++i) {
    point = points[pointIndex(i)];

    if (point.skip) {
      // If there is a skipped point inside a segment, spanGaps must be true
      continue;
    }

    const x = point.x;
    const y = point.y;
    const truncX = x | 0; // truncated x-coordinate

    if (truncX === prevX) {
      // Determine `minY` / `maxY` and `avgX` while we stay within same x-position
      if (y < minY) {
        minY = y;
      } else if (y > maxY) {
        maxY = y;
      }
      // For first point in group, countX is `0`, so average will be `x` / 1.
      avgX = (countX * avgX + x) / ++countX;
    } else {
      drawX();
      // Draw line to next x-position, using the first (or only)
      // y-value in that group
      ctx.lineTo(x, y);

      prevX = truncX;
      countX = 0;
      minY = maxY = y;
    }
    // Keep track of the last y-value in group
    lastY = y;
  }
  drawX();
}