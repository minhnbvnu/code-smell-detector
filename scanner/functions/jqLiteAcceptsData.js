function jqLiteAcceptsData(node) {
  // The window object can accept data but has no nodeType
  // Otherwise we are only interested in elements (1) and documents (9)
  var nodeType = node.nodeType;
  return nodeType === NODE_TYPE_ELEMENT || !nodeType || nodeType === NODE_TYPE_DOCUMENT;
}