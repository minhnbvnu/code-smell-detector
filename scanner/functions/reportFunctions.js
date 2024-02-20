function reportFunctions(context, node) {
  if (node.body.type === 'BlockStatement' &&
    !endsWithReturnStatement(node.body.body)
  ) {
    context.report({
      node,
      message: 'Function must end with a return statement, so that it doesn\'t return `undefined`'
    });
  }
}