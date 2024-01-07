function inflateEnds(flatCoordinates, ends) {
  const endss = [];
  let offset = 0;
  let prevEndIndex = 0;
  let startOrientation;
  for (let i = 0, ii = ends.length; i < ii; ++i) {
    const end = ends[i];
    // classifies an array of rings into polygons with outer rings and holes
    const orientation = linearRingIsClockwise(flatCoordinates, offset, end, 2);
    if (startOrientation === undefined) {
      startOrientation = orientation;
    }
    if (orientation === startOrientation) {
      endss.push(ends.slice(prevEndIndex, i + 1));
    } else {
      if (endss.length === 0) {
        continue;
      }
      endss[endss.length - 1].push(ends[prevEndIndex]);
    }
    prevEndIndex = i + 1;
    offset = end;
  }
  return endss;
}