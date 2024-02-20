function containsCommentsInside(node) {
  return !!_tk.findInBetween(node.startToken, node.endToken, _tk.isComment);
}