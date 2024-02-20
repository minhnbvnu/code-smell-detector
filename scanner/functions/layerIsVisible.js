function layerIsVisible(lyr) {
    if (objectIsHidden(lyr)) return false;
    return some(lyr.layers, layerIsVisible) ||
      some(lyr.pageItems, itemIsVisible) ||
      some(lyr.groupItems, groupIsVisible);
  }