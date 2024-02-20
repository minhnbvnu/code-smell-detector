function _deleteNodePartially(tx, nodeSel) {
  // Just go through all components and apply a property deletion
  var components = nodeSel.components;
  var length = components.length;
  for (var i = 0; i < length; i++) {
    var comp = components[i];
    var startOffset = 0;
    var endOffset = tx.get(comp.path).length;
    if (i === 0) {
      startOffset = nodeSel.startOffset;
    }
    if (i === length-1) {
      endOffset = nodeSel.endOffset;
    }
    _deletePropertySelection(tx, {
      selection: tx.createSelection({
        type: 'property',
        path: comp.path,
        startOffset: startOffset,
        endOffset: endOffset
      })
    });
  }
}