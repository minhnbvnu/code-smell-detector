function isComparison(node) {
  return node.parent &&
    node.parent.type === 'BinaryExpression' &&
    _.includes(node.parent.operator, ['==', '!=', '===', '!==']);
}