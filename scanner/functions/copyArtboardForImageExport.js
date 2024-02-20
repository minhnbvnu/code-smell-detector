function copyArtboardForImageExport(ab, masks, items) {
  var layerMasks = filter(masks, function(o) {return !!o.layer;}),
      artboardBounds = ab.artboardRect,
      sourceItems = items || toArray(doc.layers),
      destLayer = doc.layers.add(),
      destGroup = doc.groupItems.add(),
      itemCount = 0,
      groupPos, group2, doc2;

  destLayer.name = 'ArtboardContent';
  destGroup.move(destLayer, ElementPlacement.PLACEATEND);
  forEach(sourceItems, copyLayerOrItem);

  // kludge: export empty documents iff items argument is missing (assuming
  //    this is the main artboard image, which is needed to set the container size)
  if (itemCount > 0 || !items) {
    // need to save group position before copying to second document. Oddly,
    // the reported position of the original group changes after duplication
    groupPos = destGroup.position;
    doc2 = makeTmpDocument(doc, ab);
    group2 = destGroup.duplicate(doc2.layers[0], ElementPlacement.PLACEATEND);
    group2.position = groupPos;
  }
  destGroup.remove();
  destLayer.remove();
  return doc2 || null;

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

  function removeHiddenItems(group) {
    // only remove text frames, for performance
    // TODO: consider checking all item types
    // TODO: consider checking subgroups (recursively)
    // FIX: convert group.textFrames to array to avoid runtime error 'No such element' in forEach()
    forEach(toArray(group.textFrames), removeItemIfHidden);
  }

  function removeItemIfHidden(item) {
    if (item.hidden) item.remove();
  }

  // Item: Layer (sublayer) or PageItem
  function copyLayerOrItem(item) {
    if (item.typename == 'Layer') {
      copyLayer(item);
    } else {
      copyPageItem(item, destGroup);
    }
  }

  // TODO: locked objects in masked layer may not be included in mask.items array
  //   consider traversing layer in this function ...
  //   make sure doubly masked objects aren't copied twice
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

  // Remove opacity and multiply from an item and add to the item's
  // name property (exported as an SVG id). This prevents AI's SVG exporter
  // from converting these items to images. The styles are later parsed out
  // of the SVG id in reapplyEffectsInSVG().
  // Example names: Z--opacity50  Z--multiply--original-name
  // TODO: handle other styles that cause image conversion
  // (This trick does not work for many other effects, like drop shadows and
  //  styles added via the Appearance panel).
  function handleEffects(item) {
    var name = '';
    if (item.opacity && item.opacity < 100) {
      name += '-opacity' + item.opacity;
      item.opacity = 100;
    }
    if (item.blendingMode == BlendModes.MULTIPLY) {
      item.blendingMode = BlendModes.NORMAL;
      name += '-multiply';
    }
    if (name) {
      if (item.name) {
        name += '--' + item.name;
      }
      item.name = 'Z-' + name;
    }
  }

  function findLayerMask(lyr) {
    return find(layerMasks, function(o) {return o.layer == lyr;});
  }

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
}