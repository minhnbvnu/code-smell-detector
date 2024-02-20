function getRequireData(node) {
  if (!node || node.type !== Syntax.CallExpression) {
    return null;
  }

  var callee = node.callee;
  if (callee.type !== Syntax.Identifier
    || (callee.name !== 'require')) {
    return null;
  }
  var args = node['arguments'];
  if (args.length === 0) {
    return null;
  }
  var firstArgument = args[0];
  if (firstArgument.type !== Syntax.Literal) {
    return null;
  }

  return {
    name: firstArgument.value
  };
}