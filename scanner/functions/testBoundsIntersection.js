function testBoundsIntersection(a, b) {
  return a[2] >= b[0] && b[2] >= a[0] && a[3] <= b[1] && b[3] <= a[1];
}