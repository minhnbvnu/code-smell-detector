function memberExpressionRootIdentifier(path) {
  // Traverse up to the parent before the topmost member expression, and then
  // traverse back down to find the topmost identifier. It seems like there
  // might be a better way to do this.
  const parent = path.findParent(p => !p.isMemberExpression())
  const { type } = parent.node

  let memberExpression
  if (type === 'ObjectProperty') {
    // The topmost MemberExpression's parent is an object property, so the
    // topmost MemberExpression should be the value.
    memberExpression = parent.get('value')
  }

  if (!memberExpression || memberExpression.type !== 'MemberExpression') {
    // This case is currently unhandled by this plugin.
    return null
  }

  // We have a topmost MemberExpression now, so we want to traverse down the
  // left half untli we no longer see MemberExpressions. This node will give us
  // our leftmost identifier.
  while (memberExpression.node.object.type === 'MemberExpression') {
    memberExpression = memberExpression.get('object')
  }

  return memberExpression.get('object')
}