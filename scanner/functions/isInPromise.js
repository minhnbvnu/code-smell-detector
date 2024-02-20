function isInPromise(context) {
  let functionNode = context
    .getAncestors()
    .filter((node) => {
      return (
        node.type === 'ArrowFunctionExpression' ||
        node.type === 'FunctionExpression'
      )
    })
    .reverse()[0]
  while (
    functionNode &&
    functionNode.parent &&
    functionNode.parent.type === 'MemberExpression' &&
    functionNode.parent.object === functionNode &&
    functionNode.parent.property.type === 'Identifier' &&
    functionNode.parent.property.name === 'bind' &&
    functionNode.parent.parent &&
    functionNode.parent.parent.type === 'CallExpression' &&
    functionNode.parent.parent.callee === functionNode.parent
  ) {
    functionNode = functionNode.parent.parent
  }
  return functionNode && functionNode.parent && isPromise(functionNode.parent)
}