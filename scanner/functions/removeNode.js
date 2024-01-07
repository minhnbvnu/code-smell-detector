function removeNode(node) {
  return node && node.parentNode ? node.parentNode.removeChild(node) : null;
}