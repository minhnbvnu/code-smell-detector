function isInlineThenFunctionExpression(node) {
  return (
    isFunctionWithBlockStatement(node) &&
    isMemberCall('then', node.parent) &&
    isFirstArgument(node)
  )
}