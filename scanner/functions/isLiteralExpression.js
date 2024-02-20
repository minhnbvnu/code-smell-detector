function isLiteralExpression(node) {
        return node.kind >= ts.SyntaxKind.FirstLiteralToken &&
            node.kind <= ts.SyntaxKind.LastLiteralToken;
    }