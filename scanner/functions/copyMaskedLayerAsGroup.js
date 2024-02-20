function copyMaskedLayerAsGroup(lyr, mask) {
    var maskBounds = mask.mask.geometricBounds;
    var newMask, newGroup;
    if (!testBoundsIntersection(artboardBounds, maskBounds)) {
      return;
    }
    newGroup = doc.groupItems.add();
    newGroup.move(destGroup, ElementPlacement.PLACEATEND);
    forEach(mask.items, function(item) {
      copyPageItem(item, newGroup);
    });
    if (newGroup.pageItems.length > 0) {
      // newMask = duplicateItem(mask.mask, destGroup);
      // TODO: refactor
      newMask = mask.mask.duplicate(destGroup, ElementPlacement.PLACEATEND);
      newMask.moveToBeginning(newGroup);
      newGroup.clipped = true;
    } else {
      newGroup.remove();
    }
  }