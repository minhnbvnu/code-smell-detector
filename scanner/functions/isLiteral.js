function isLiteral(ast) {
  return ast.body.length === 0 ||
      ast.body.length === 1 && (
      ast.body[0].expression.type === AST.Literal ||
      ast.body[0].expression.type === AST.ArrayExpression ||
      ast.body[0].expression.type === AST.ObjectExpression);
}