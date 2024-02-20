function addPoint(x, y, intersections) {
  if (!intersections.some(function (elm) { return elm[0] === x && elm[1] === y; })) {
    intersections.push([x, y]);
  }
}