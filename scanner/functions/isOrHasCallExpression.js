function isOrHasCallExpression(node) {
  if (t.isCallExpression(node)) {
    return true;
  }

  return t.isMemberExpression(node) && isOrHasCallExpression(node.object);
}