function emptyNode(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild)
  }
}