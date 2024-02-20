function expressionToArray(expr) {
  var parts = [];
  switch(expr.type) {
    case Syntax.CallExpression:
      parts = expressionToArray(expr.callee);
      break;
    case Syntax.MemberExpression:
      parts = expressionToArray(expr.object);
      if (expr.computed) {
        parts.push('...');
      } else {
        parts.push(expr.property.name || expr.property.value);
      }
      break;
    case Syntax.Identifier:
      parts = [expr.name];
      break;
    case Syntax.Literal:
      parts = [expr.raw];
      break;
    case Syntax.ThisExpression:
      parts = ['this'];
      break;
    case Syntax.ObjectExpression:
      var properties = expr.properties.map(function(property) {
        return expressionToString(property.key) +
          ': ' +
          expressionToString(property.value);
      });
      parts = ['{' + properties.join(', ') + '}'];
      break;
    case Syntax.ArrayExpression:
      parts = ['[' + expr.elements.map(expressionToString).join(', ') + ']'];
      break;
  }
  return parts;
}