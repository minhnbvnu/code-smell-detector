function isObjectLiteralExpression(node) {
        return node.kind === ts.SyntaxKind.ObjectLiteralExpression;
    }