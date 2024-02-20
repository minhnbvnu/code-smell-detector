function artboardContainsVisibleRasterImage(ab) {
  function test(item) {
    // Calling objectHasLayer() prevents a crash caused by opacity masks created from linked rasters.
    return objectHasLayer(item) && objectOverlapsArtboard(item, ab) && !objectIsHidden(item);
  }
  // TODO: verify that placed items are rasters
  return contains(doc.placedItems, test) || contains(doc.rasterItems, test);
}