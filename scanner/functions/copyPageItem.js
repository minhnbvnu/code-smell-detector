function copyPageItem(item, dest) {
    var excluded =
        // item.typename == 'TextFrame' || // text objects should be copied if visible
        !testBoundsIntersection(item.geometricBounds, artboardBounds) ||
        objectIsHidden(item) || item.clipping;
    var copy;
    if (!excluded) {
      copy = item.duplicate(dest, ElementPlacement.PLACEATEND); //  duplicateItem(item, dest);
      handleEffects(copy);
      itemCount++;
      if (copy.typename == 'GroupItem') {
        removeHiddenItems(copy);
      }
    }
  }