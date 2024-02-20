function isBalanced(node) {
  return getHeight(0, node) !== BAD_VALUE;
}