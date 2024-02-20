function hasAncestorData (node) {
  var parentNode = node.parent;
  return isDef(parentNode) && (isDef(parentNode.data) || hasAncestorData(parentNode))
}