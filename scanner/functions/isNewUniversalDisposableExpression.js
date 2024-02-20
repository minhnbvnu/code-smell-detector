function isNewUniversalDisposableExpression(node) {
  return (
    node.type === 'NewExpression' &&
    node.callee.type === 'Identifier' &&
    node.callee.name === 'UniversalDisposable'
  );
}