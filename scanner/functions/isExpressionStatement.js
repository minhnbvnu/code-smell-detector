function isExpressionStatement(node) {
        return node.kind === ts.SyntaxKind.ExpressionStatement;
    }