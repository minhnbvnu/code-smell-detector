function findMidPoint(points) {
  var midIdx = points.length / 2;
  if (points.length % 2) {
    return points[Math.floor(midIdx)];
  } else {
    var p0 = points[midIdx - 1];
    var p1 = points[midIdx];
    return {x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2};
  }
}