function forEachImageLayer(imageType, callback) {
  var targetLayers = findTaggedLayers(imageType); // only finds visible layers with a tag
  var hiddenLayers = [];
  if (targetLayers.length === 0) return;

  // Hide all visible layers (image export captures entire artboard)
  forEach(findLayers(doc.layers), function(lyr) {
    // Except: don't hide layers that are children of a targeted layer
    // (inconvenient to unhide these selectively later)
    if (find(targetLayers, function(target) {
      return layerIsChildOf(lyr, target);
    })) return;
    lyr.visible = false;
    hiddenLayers.push(lyr);
  });

  forEach(targetLayers, function(lyr) {
    // show layer (and any hidden parent layers)
    unhideLayer(lyr);
    callback(lyr);
    lyr.visible = false; // hide again
  });

  // Re-show all layers except image layers
  forEach(hiddenLayers, function(lyr) {
    if (indexOf(targetLayers, lyr) == -1) {
      lyr.visible = true;
    }
  });
}