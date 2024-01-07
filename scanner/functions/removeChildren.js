function removeChildren(node) {
  while (node.lastChild) {
    node.removeChild(node.lastChild);
  }
}