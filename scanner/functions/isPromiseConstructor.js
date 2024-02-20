function isPromiseConstructor(node) {
  return (
    node.type === 'NewExpression' &&
    node.callee.type === 'Identifier' &&
    node.callee.name === 'Promise'
  )
}