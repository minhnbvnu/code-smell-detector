function containsLine(coordinates, point) {
  var ao, bo, ab;
  for (var i = 0, n = coordinates.length; i < n; i++) {
    bo = distance(coordinates[i], point);
    if (bo === 0) return true;
    if (i > 0) {
      ab = distance(coordinates[i], coordinates[i - 1]);
      if (
        ab > 0 &&
        ao <= ab &&
        bo <= ab &&
        (ao + bo - ab) * (1 - Math.pow((ao - bo) / ab, 2)) < epsilon2 * ab
      )
        return true;
    }
    ao = bo;
  }
  return false;
}