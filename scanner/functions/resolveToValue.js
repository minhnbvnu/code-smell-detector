function resolveToValue(expr, scopeChain) {
  switch (expr.type) {
    case Syntax.AssignmentExpression:
      if (expr.operator === '=') {
        return resolveToValue(expr.right, scopeChain);
      }
      break;
    case Syntax.Identifier:
      var value;
      scopeChain.some(function(scope, i) {
        if (hasOwnProperty.call(scope, expr.name) && scope[expr.name]) {
          value = resolveToValue(scope[expr.name], scopeChain.slice(i));
          return true;
        }
      });
      return value;
  }
  return expr;
}