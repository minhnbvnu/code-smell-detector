function isArrayLiteralExpression(node) {
        return node.kind === ts.SyntaxKind.ArrayLiteralExpression;
    }