function findCommonAncestorLayer(items) {
  var layers = [],
      ancestorLyr = null,
      item;
  for (var i=0, n=items.length; i<n; i++) {
    item = items[i];
    if (item.parent.typename != 'Layer' || contains(layers, item.parent)) {
      continue;
    }
    // remember layer, to avoid redundant searching (is this worthwhile?)
    layers.push(item.parent);
    if (!ancestorLyr) {
      ancestorLyr = item.parent;
    } else {
      ancestorLyr = findCommonLayer(ancestorLyr, item.parent);
      if (!ancestorLyr) {
        // Failed to find a common ancestor
        return null;
      }
    }
  }
  return ancestorLyr;
}