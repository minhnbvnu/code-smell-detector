function rmBadConstructor(node) {
  if (node.callee.type != 'Identifier' || isValidConstructor(node.callee)) {
    return node
  }

  return {
    type: 'CallExpression',
    callee: node.callee,
    arguments: node.arguments
  }
}