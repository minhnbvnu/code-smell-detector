function isAsExpression(node) {
        return node.kind === ts.SyntaxKind.AsExpression;
    }