function isStructuredPattern(node) {
  return node.type === Syntax.ObjectPattern ||
    node.type === Syntax.ArrayPattern;
}