function isExpressionWithTypeArguments(node) {
        return node.kind === ts.SyntaxKind.ExpressionWithTypeArguments;
    }