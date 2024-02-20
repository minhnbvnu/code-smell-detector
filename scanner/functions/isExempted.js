function isExempted(exceptions, node) {
  if (node.type !== 'MemberExpression') {
    return false;
  }
  const matches = exceptions.some(matcher => matcher(node));
  return matches ||
    (node.object.type === 'MemberExpression' && isExempted(exceptions, node.object));
}