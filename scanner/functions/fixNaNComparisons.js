function fixNaNComparisons(node) {
  if (!comparisonOperators.test(node.operator) ||
      !isNaNComparison(node.left, node.right)) {
    return node
  }

  var nanCall = {
    type: 'CallExpression',
    callee: {
      type: 'Identifier',
      name: 'isNaN'
    },
    arguments: getOtherNode(node.left, node.right)
  }

  return node.operator[0] == '!'
    ? { type: 'UnaryExpression', operator: '!', argument: nanCall }
    : nanCall
}