function getOpeningParentheses(node) {
  return _tk.findInBetween(node.callee.endToken, node.endToken, '(');
}