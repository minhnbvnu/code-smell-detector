function selectMaskedItems(items, clipRect, abRect) {
  var found = [];
  var itemRect, itemInArtboard, itemInMask, maskInArtboard;
  for (var i=0, n=items.length; i<n; i++) {
    itemRect = items[i].geometricBounds;
    // capture items that intersect the artboard but are masked...
    itemInArtboard = testBoundsIntersection(abRect, itemRect);
    maskInArtboard = testBoundsIntersection(abRect, clipRect);
    itemInMask = testBoundsIntersection(itemRect, clipRect);
    if (itemInArtboard && (!maskInArtboard || !itemInMask)) {
      found.push(items[i]);
    }
  }
  return found;
}