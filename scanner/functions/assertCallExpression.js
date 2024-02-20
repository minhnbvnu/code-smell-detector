function assertCallExpression(node) {
  if (node.type !== AST_NODE_TYPES.CALL_EXPRESSION) {
    throw new Error('Expected a CallExpression node for a Hook declaration.');
  }

  return node;
}