function getAllArtboardBounds() {
  var rect, bounds;
  for (var i=0, n=doc.artboards.length; i<n; i++) {
    rect = doc.artboards[i].artboardRect;
    if (i === 0) {
      bounds = rect;
    } else {
      bounds = [
        Math.min(rect[0], bounds[0]), Math.max(rect[1], bounds[1]),
        Math.max(rect[2], bounds[2]), Math.min(rect[3], bounds[3])];
    }
  }
  return bounds;
}