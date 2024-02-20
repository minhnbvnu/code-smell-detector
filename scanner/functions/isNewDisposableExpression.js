function isNewDisposableExpression(node) {
  if (node.type !== 'NewExpression' || node.callee.type !== 'Identifier') {
    return;
  }
  switch (node.callee.name) {
    case 'UniversalDisposable':
    case 'Disposable':
    case 'CompositeDisposable':
      return true;
    default:
      return false;
  }
}