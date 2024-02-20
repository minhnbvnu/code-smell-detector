function isAssignable(ast) {
  return ast.type === AST.Identifier || ast.type === AST.MemberExpression;
}