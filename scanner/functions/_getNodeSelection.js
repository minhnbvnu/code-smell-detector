function _getNodeSelection(doc, containerSelection) {
  var result = [];
  var groups = {};
  var range = containerSelection.getRange();
  var container = doc.get(containerSelection.containerId);
  var components = container.getComponentsForRange(range);
  for (var i = 0; i < components.length; i++) {
    var comp = components[i];
    var node = doc.get(comp.rootId);
    if (!node) {
      throw new Error('Illegal state: expecting a component to have a proper root node id set.');
    }
    var nodeId = node.id;
    var nodeGroup;
    if (!groups[nodeId]) {
      nodeGroup = {
        node: node,
        isFully: true,
        components: []
      };
      groups[nodeId] = nodeGroup;
      result.push(nodeGroup);
    }
    nodeGroup = groups[nodeId];
    nodeGroup.components.push(comp);
  }
  // finally we analyze the first and last node-selection
  // if these
  var startComp = components[0];
  var endComp = components[components.length-1];
  var startNodeSel = result[0];
  var endNodeSel = result[result.length-1];
  var startLen = doc.get(startComp.path).length;
  var endLen = doc.get(endComp.path).length;
  if (range.start.offset > 0 ||
    (startComp.hasPrevious() && startComp.getPrevious().rootId === startComp.rootId))
  {
    startNodeSel.isFully = false;
    startNodeSel.startOffset = range.start.offset;
    if (result.length === 1) {
      startNodeSel.endOffset = range.end.offset;
    } else {
      startNodeSel.endOffset = startLen;
    }
  }
  if (result.length > 1 &&
      (range.end.offset < endLen ||
        (endComp.hasNext() && endComp.getNext().rootId === endComp.rootId))
     ) {
    endNodeSel.isFully = false;
    endNodeSel.startOffset = 0;
    endNodeSel.endOffset = range.end.offset;
  }
  return result;
}