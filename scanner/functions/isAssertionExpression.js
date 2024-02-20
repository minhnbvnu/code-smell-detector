function isAssertionExpression(node) {
        return node.kind === ts.SyntaxKind.AsExpression ||
            node.kind === ts.SyntaxKind.TypeAssertionExpression;
    }