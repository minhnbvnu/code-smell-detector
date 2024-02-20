function copyLayer(lyr) {
    var mask;
    if (lyr.hidden) return; // ignore hidden layers
    mask = findLayerMask(lyr);
    if (mask) {
      copyMaskedLayerAsGroup(lyr, mask);
    } else {
      forEach(getSortedLayerItems(lyr), copyLayerOrItem);
    }
  }