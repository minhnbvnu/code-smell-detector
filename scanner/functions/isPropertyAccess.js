function isPropertyAccess(node) {
  return Boolean(
    node &&
    node.parent &&
    node.parent.type === 'MemberExpression' &&
    node.parent.property === node
  );
}