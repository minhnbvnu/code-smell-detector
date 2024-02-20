function isRequireResolve(node) {
  return (
    node &&
    node.type === 'CallExpression' &&
    node.callee.type === 'MemberExpression' &&
    node.callee.object.type === 'Identifier' &&
    node.callee.object.name === 'require' &&
    node.callee.property.type === 'Identifier' &&
    node.callee.property.name === 'resolve' &&
    node.arguments[0] &&
    node.arguments[0].type === 'Literal'
  );
}