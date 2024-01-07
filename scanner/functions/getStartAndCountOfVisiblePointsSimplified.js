function getStartAndCountOfVisiblePointsSimplified(meta, points) {
  const pointCount = points.length;

  let start = 0;
  let count;

  const {iScale} = meta;
  const {min, max, minDefined, maxDefined} = iScale.getUserBounds();

  if (minDefined) {
    start = _limitValue(_lookupByKey(points, iScale.axis, min).lo, 0, pointCount - 1);
  }
  if (maxDefined) {
    count = _limitValue(_lookupByKey(points, iScale.axis, max).hi + 1, start, pointCount) - start;
  } else {
    count = pointCount - start;
  }

  return {start, count};
}