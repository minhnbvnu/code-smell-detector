function _deleteContainerSelection(tx, args) {
  var selection = args.selection;
  var containerId = selection.containerId;
  var range = selection.getRange();
  var nodeSels = _getNodeSelection(tx, selection);
  var nodeSel, node, type;
  var result = { selection: null };
  // apply deletion backwards so that we do not to recompute array positions
  var container = tx.get(containerId);
  var firstNodePos = container.getPosition(nodeSels[0].node.id);

  for (var idx = nodeSels.length - 1; idx >= 0; idx--) {
    nodeSel = nodeSels[idx];
    node = nodeSel.node;
    if (nodeSel.isFully) {
      deleteNode(tx, { nodeId: node.id });
    } else {
      _deleteNodePartially(tx, nodeSel);
    }
  }
  // update the selection; take the first component which is not fully deleted
  if (!nodeSels[0].isFully) {
    result.selection = tx.createSelection({
      type: 'property',
      path: range.start.path,
      startOffset: range.start.offset
    });
  } else {
    // if the first node has been deleted fully we need to find the first property
    // which remained and set the selection to the first character.
    result.selection = null;
    for (var i = 1; i < nodeSels.length; i++) {
      nodeSel = nodeSels[i];
      if (!nodeSel.isFully) {
        result.selection = tx.createSelection({
          type: 'property',
          path: nodeSel.components[0].path,
          startOffset: 0
        });
        break;
      }
    }
    // TODO: if we could not find an insertion position,
    // that is the case when nodes were fully selected,
    // insert a default text node and set the cursor into it
    if (result.selection === null) {
      type = tx.getSchema().getDefaultTextType();
      node = {
        type: type,
        id: _.uuid(type),
        content: ""
      };
      tx.create(node);
      container.show(node.id, firstNodePos);
      result.selection = tx.createSelection({
        type: 'property',
        path: [node.id, 'content'],
        startOffset: 0
      });
    }
  }
  // Do a merge
  if (nodeSels.length>1) {
    var firstSel = nodeSels[0];
    var lastSel = nodeSels[nodeSels.length-1];
    if (firstSel.isFully || lastSel.isFully) {
      // TODO: think about if we want to merge in those cases
    } else {
      var secondComp = _.last(lastSel.components);
      result = merge(tx, { selection: result.selection, containerId: containerId, path: secondComp.path, direction: 'left' });
    }
  }
  // If the container is empty after deletion insert a default text node is inserted
  container = tx.get(containerId);
  if (container.nodes.length === 0) {
    type = tx.getSchema().getDefaultTextType();
    node = {
      type: type,
      id: _.uuid(type),
      content: ""
    };
    tx.create(node);
    container.show(node.id, 0);
    result.selection = tx.createSelection({
      type: 'property',
      path: [node.id, 'content'],
      startOffset: 0
    });
  }
  return result;
}