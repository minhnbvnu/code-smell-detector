function defaultGetNodeKey(node) {
  if (node) {
      return (node.getAttribute && node.getAttribute('id')) || node.id;
  }
}