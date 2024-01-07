function addPointsBelow(points, sourcePoint, linesBelow) {
  const postponed = [];
  for (let j = 0; j < linesBelow.length; j++) {
    const line = linesBelow[j];
    const {first, last, point} = findPoint(line, sourcePoint, 'x');

    if (!point || (first && last)) {
      continue;
    }
    if (first) {
      // First point of an segment -> need to add another point before this,
      // from next line below.
      postponed.unshift(point);
    } else {
      points.push(point);
      if (!last) {
        // In the middle of an segment, no need to add more points.
        break;
      }
    }
  }
  points.push(...postponed);
}