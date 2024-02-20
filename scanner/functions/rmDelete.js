function rmDelete(node) {
  if (node.operator != 'delete') {
    return node
  }

  if (node.argument.type != 'Identifier') {
    return node
  }

  return {
    type: 'AssignmentExpression',
    operator: '=',
    left: node.argument,
    right: { type: 'Identifier', name: 'undefined' }
  }
}