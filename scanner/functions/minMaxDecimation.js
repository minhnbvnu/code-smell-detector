function minMaxDecimation(data, start, count, availableWidth) {
  let avgX = 0;
  let countX = 0;
  let i, point, x, y, prevX, minIndex, maxIndex, startIndex, minY, maxY;
  const decimated = [];
  const endIndex = start + count - 1;

  const xMin = data[start].x;
  const xMax = data[endIndex].x;
  const dx = xMax - xMin;

  for (i = start; i < start + count; ++i) {
    point = data[i];
    x = (point.x - xMin) / dx * availableWidth;
    y = point.y;
    const truncX = x | 0;

    if (truncX === prevX) {
      // Determine `minY` / `maxY` and `avgX` while we stay within same x-position
      if (y < minY) {
        minY = y;
        minIndex = i;
      } else if (y > maxY) {
        maxY = y;
        maxIndex = i;
      }
      // For first point in group, countX is `0`, so average will be `x` / 1.
      // Use point.x here because we're computing the average data `x` value
      avgX = (countX * avgX + point.x) / ++countX;
    } else {
      // Push up to 4 points, 3 for the last interval and the first point for this interval
      const lastIndex = i - 1;

      if (!isNullOrUndef(minIndex) && !isNullOrUndef(maxIndex)) {
        // The interval is defined by 4 points: start, min, max, end.
        // The starting point is already considered at this point, so we need to determine which
        // of the other points to add. We need to sort these points to ensure the decimated data
        // is still sorted and then ensure there are no duplicates.
        const intermediateIndex1 = Math.min(minIndex, maxIndex);
        const intermediateIndex2 = Math.max(minIndex, maxIndex);

        if (intermediateIndex1 !== startIndex && intermediateIndex1 !== lastIndex) {
          decimated.push({
            ...data[intermediateIndex1],
            x: avgX,
          });
        }
        if (intermediateIndex2 !== startIndex && intermediateIndex2 !== lastIndex) {
          decimated.push({
            ...data[intermediateIndex2],
            x: avgX
          });
        }
      }

      // lastIndex === startIndex will occur when a range has only 1 point which could
      // happen with very uneven data
      if (i > 0 && lastIndex !== startIndex) {
        // Last point in the previous interval
        decimated.push(data[lastIndex]);
      }

      // Start of the new interval
      decimated.push(point);
      prevX = truncX;
      countX = 0;
      minY = maxY = y;
      minIndex = maxIndex = startIndex = i;
    }
  }

  return decimated;
}