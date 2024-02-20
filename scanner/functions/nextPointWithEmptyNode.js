function nextPointWithEmptyNode(point, isSkipInnerOffset) {
  var node, offset; // if node is empty string node, return current node's sibling.

  if (dom_isEmpty(point.node)) {
    node = point.node.nextSibling;
    offset = 0;
    return {
      node: node,
      offset: offset
    };
  }

  if (nodeLength(point.node) === point.offset) {
    if (isEditable(point.node)) {
      return null;
    }

    var nextTextNode = getNextTextNode(point.node);

    if (nextTextNode) {
      node = nextTextNode;
      offset = 0;
    } else {
      node = point.node.parentNode;
      offset = dom_position(point.node) + 1;
    } // if next node is editable, return current node's sibling node.


    if (isEditable(node)) {
      node = point.node.nextSibling;
      offset = 0;
    }
  } else if (hasChildren(point.node)) {
    node = point.node.childNodes[point.offset];
    offset = 0;

    if (dom_isEmpty(node)) {
      return null;
    }
  } else {
    node = point.node;
    offset = isSkipInnerOffset ? nodeLength(point.node) : point.offset + 1;

    if (dom_isEmpty(node)) {
      return null;
    }
  }

  return {
    node: node,
    offset: offset
  };
}