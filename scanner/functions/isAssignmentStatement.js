function isAssignmentStatement(node) {
  return node.type === Syntax.ExpressionStatement &&
    node.expression.type === Syntax.AssignmentExpression &&
    node.expression.operator === '=';
}