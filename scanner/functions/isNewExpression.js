function isNewExpression(node) {
        return node.kind === ts.SyntaxKind.NewExpression;
    }