function isExportsOrModuleExpression(expr) {
  if (expr.left.type !== Syntax.MemberExpression) {
    return false;
  }
  var exprArr = expressionToArray(expr.left);
  return (exprArr[0] === 'module' && exprArr[1] === 'exports') ||
    exprArr[0] == 'exports';
}