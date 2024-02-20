function objectOverlapsArtboard(obj, ab) {
  return testBoundsIntersection(ab.artboardRect, obj.geometricBounds);
}