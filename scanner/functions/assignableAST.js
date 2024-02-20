function assignableAST(ast) {
  if (ast.body.length === 1 && isAssignable(ast.body[0].expression)) {
    return {type: AST.AssignmentExpression, left: ast.body[0].expression, right: {type: AST.NGValueParameter}, operator: '='};
  }
}