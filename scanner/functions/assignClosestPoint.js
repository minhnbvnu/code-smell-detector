function assignClosestPoint(
  flatCoordinates,
  offset,
  end,
  stride,
  maxDelta,
  isRing,
  x,
  y,
  closestPoint,
  minSquaredDistance,
  tmpPoint,
) {
  if (offset == end) {
    return minSquaredDistance;
  }
  let i, squaredDistance;
  if (maxDelta === 0) {
    // All points are identical, so just test the first point.
    squaredDistance = squaredDx(
      x,
      y,
      flatCoordinates[offset],
      flatCoordinates[offset + 1],
    );
    if (squaredDistance < minSquaredDistance) {
      for (i = 0; i < stride; ++i) {
        closestPoint[i] = flatCoordinates[offset + i];
      }
      closestPoint.length = stride;
      return squaredDistance;
    }
    return minSquaredDistance;
  }
  tmpPoint = tmpPoint ? tmpPoint : [NaN, NaN];
  let index = offset + stride;
  while (index < end) {
    assignClosest(
      flatCoordinates,
      index - stride,
      index,
      stride,
      x,
      y,
      tmpPoint,
    );
    squaredDistance = squaredDx(x, y, tmpPoint[0], tmpPoint[1]);
    if (squaredDistance < minSquaredDistance) {
      minSquaredDistance = squaredDistance;
      for (i = 0; i < stride; ++i) {
        closestPoint[i] = tmpPoint[i];
      }
      closestPoint.length = stride;
      index += stride;
    } else {
      // Skip ahead multiple points, because we know that all the skipped
      // points cannot be any closer than the closest point we have found so
      // far.  We know this because we know how close the current point is, how
      // close the closest point we have found so far is, and the maximum
      // distance between consecutive points.  For example, if we're currently
      // at distance 10, the best we've found so far is 3, and that the maximum
      // distance between consecutive points is 2, then we'll need to skip at
      // least (10 - 3) / 2 == 3 (rounded down) points to have any chance of
      // finding a closer point.  We use Math.max(..., 1) to ensure that we
      // always advance at least one point, to avoid an infinite loop.
      index +=
        stride *
        Math.max(
          ((Math.sqrt(squaredDistance) - Math.sqrt(minSquaredDistance)) /
            maxDelta) |
            0,
          1,
        );
    }
  }
  if (isRing) {
    // Check the closing segment.
    assignClosest(
      flatCoordinates,
      end - stride,
      offset,
      stride,
      x,
      y,
      tmpPoint,
    );
    squaredDistance = squaredDx(x, y, tmpPoint[0], tmpPoint[1]);
    if (squaredDistance < minSquaredDistance) {
      minSquaredDistance = squaredDistance;
      for (i = 0; i < stride; ++i) {
        closestPoint[i] = tmpPoint[i];
      }
      closestPoint.length = stride;
    }
  }
  return minSquaredDistance;
}