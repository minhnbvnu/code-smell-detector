function getSortedLayerItems(lyr) {
  var items = toArray(lyr.pageItems).concat(toArray(lyr.layers));
  if (lyr.layers.length > 0 && lyr.pageItems.length > 0) {
    // only need to sort if layer contains both layers and page objects
    items.sort(function(a, b) {
      return b.absoluteZOrderPosition - a.absoluteZOrderPosition;
    });
  }
  return items;
}