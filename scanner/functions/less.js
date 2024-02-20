function less(data, node) {
  if (node === null) { return true; }

  return (data > node.data) && less(node.data, node.left) && more(node.data, node.right);
}