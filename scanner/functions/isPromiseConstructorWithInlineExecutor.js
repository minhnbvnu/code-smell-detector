function isPromiseConstructorWithInlineExecutor(node) {
  return (
    isPromiseConstructor(node) &&
    node.arguments.length === 1 &&
    (node.arguments[0].type === 'FunctionExpression' ||
      node.arguments[0].type === 'ArrowFunctionExpression')
  )
}