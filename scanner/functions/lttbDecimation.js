function lttbDecimation(data, start, count, availableWidth, options) {
  /**
   * Implementation of the Largest Triangle Three Buckets algorithm.
   *
   * This implementation is based on the original implementation by Sveinn Steinarsson
   * in https://github.com/sveinn-steinarsson/flot-downsample/blob/master/jquery.flot.downsample.js
   *
   * The original implementation is MIT licensed.
   */
  const samples = options.samples || availableWidth;
  // There are less points than the threshold, returning the whole array
  if (samples >= count) {
    return data.slice(start, start + count);
  }

  const decimated = [];

  const bucketWidth = (count - 2) / (samples - 2);
  let sampledIndex = 0;
  const endIndex = start + count - 1;
  // Starting from offset
  let a = start;
  let i, maxAreaPoint, maxArea, area, nextA;

  decimated[sampledIndex++] = data[a];

  for (i = 0; i < samples - 2; i++) {
    let avgX = 0;
    let avgY = 0;
    let j;

    // Adding offset
    const avgRangeStart = Math.floor((i + 1) * bucketWidth) + 1 + start;
    const avgRangeEnd = Math.min(Math.floor((i + 2) * bucketWidth) + 1, count) + start;
    const avgRangeLength = avgRangeEnd - avgRangeStart;

    for (j = avgRangeStart; j < avgRangeEnd; j++) {
      avgX += data[j].x;
      avgY += data[j].y;
    }

    avgX /= avgRangeLength;
    avgY /= avgRangeLength;

    // Adding offset
    const rangeOffs = Math.floor(i * bucketWidth) + 1 + start;
    const rangeTo = Math.min(Math.floor((i + 1) * bucketWidth) + 1, count) + start;
    const {x: pointAx, y: pointAy} = data[a];

    // Note that this is changed from the original algorithm which initializes these
    // values to 1. The reason for this change is that if the area is small, nextA
    // would never be set and thus a crash would occur in the next loop as `a` would become
    // `undefined`. Since the area is always positive, but could be 0 in the case of a flat trace,
    // initializing with a negative number is the correct solution.
    maxArea = area = -1;

    for (j = rangeOffs; j < rangeTo; j++) {
      area = 0.5 * Math.abs(
        (pointAx - avgX) * (data[j].y - pointAy) -
        (pointAx - data[j].x) * (avgY - pointAy)
      );

      if (area > maxArea) {
        maxArea = area;
        maxAreaPoint = data[j];
        nextA = j;
      }
    }

    decimated[sampledIndex++] = maxAreaPoint;
    a = nextA;
  }

  // Include the last point
  decimated[sampledIndex++] = data[endIndex];

  return decimated;
}