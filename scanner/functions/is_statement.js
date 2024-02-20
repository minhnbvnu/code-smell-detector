function is_statement(node) {
    return node instanceof AST_Statement
        && !(node instanceof AST_ClassExpression)
        && !(node instanceof AST_LambdaExpression);
}