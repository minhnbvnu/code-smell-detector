function isMethodExpression(expression) {
  return (
    expression.type === 'MemberExpression' &&
    expression.object.type === 'ThisExpression' &&
    expression.property.type === 'Identifier'
  );
}