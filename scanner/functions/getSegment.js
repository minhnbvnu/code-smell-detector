function getSegment(segment, points, bounds) {
  const {property, start: startBound, end: endBound} = bounds;
  const {between, normalize} = propertyFn(property);
  const count = points.length;
  // eslint-disable-next-line prefer-const
  let {start, end, loop} = segment;
  let i, ilen;

  if (loop) {
    start += count;
    end += count;
    for (i = 0, ilen = count; i < ilen; ++i) {
      if (!between(normalize(points[start % count][property]), startBound, endBound)) {
        break;
      }
      start--;
      end--;
    }
    start %= count;
    end %= count;
  }

  if (end < start) {
    end += count;
  }
  return {start, end, loop, style: segment.style};
}