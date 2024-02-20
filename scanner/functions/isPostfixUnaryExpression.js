function isPostfixUnaryExpression(node) {
        return node.kind === ts.SyntaxKind.PostfixUnaryExpression;
    }