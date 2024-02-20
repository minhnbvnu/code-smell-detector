function testSimilarBounds(a, b, maxOffs) {
  if (maxOffs >= 0 === false) maxOffs = 1;
  for (var i=0; i<4; i++) {
    if (Math.abs(a[i] - b[i]) > maxOffs) return false;
  }
  return true;
}