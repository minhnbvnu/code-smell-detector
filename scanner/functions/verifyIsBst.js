function verifyIsBst(tree) {
  if (tree === null) { return true; }

  return less(tree.data, tree.left) && more(tree.data, tree.right);
}