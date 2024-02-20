function calculateCentroid(c1Size, c1Centroid, c2Size, c2Centroid) {
  var newCentroid = [],
      newSize = c1Size + c2Size,
      n = c1Centroid.length,
      i = -1;
  while (++i < n) {
    newCentroid[i] = (c1Size * c1Centroid[i] + c2Size * c2Centroid[i]) / newSize;
  }
  return newCentroid;
}