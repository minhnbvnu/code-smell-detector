function findLayers(layers, test) {
  var retn = [];
  forEach(layers, function(lyr) {
    var found = null;
    if (objectIsHidden(lyr)) {
      // skip
    } else if (!test || test(lyr)) {
      found = [lyr];
    } else if (lyr.layers.length > 0) {
      // examine sublayers (only if layer didn't test positive)
      found = findLayers(lyr.layers, test);
    }
    if (found) {
      retn = retn ? retn.concat(found) : found;
    }
  });
  // Reverse the order of found layers:
  // Layers seem to be fetched from top to bottom in the AI layer stack...
  // We want separately-rendered layers (like :svg or :symbol) to be
  // converted to HTML from bottom to top
  retn.reverse();
  return retn;
}