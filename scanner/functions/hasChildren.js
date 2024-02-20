function hasChildren(node) {
  return Object.prototype.hasOwnProperty.call(node, "children");
}