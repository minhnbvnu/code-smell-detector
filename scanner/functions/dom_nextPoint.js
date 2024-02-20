function dom_nextPoint(point, isSkipInnerOffset) {
  var node, offset;

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
    }
  } else if (hasChildren(point.node)) {
    node = point.node.childNodes[point.offset];
    offset = 0;
  } else {
    node = point.node;
    offset = isSkipInnerOffset ? nodeLength(point.node) : point.offset + 1;
  }

  return {
    node: node,
    offset: offset
  };
}