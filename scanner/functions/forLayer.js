function forLayer(lyr) {
    // if (lyr.hidden) return; // bug -- layers use visible property, not hidden
    if (objectIsHidden(lyr)) return;
    forEach(lyr.pageItems, forPageItem);
    forEach(lyr.layers, forLayer);
    forEach(lyr.groupItems, forGroup);
  }