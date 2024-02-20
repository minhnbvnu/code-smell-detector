function isElementAccessExpression(node) {
        return node.kind === ts.SyntaxKind.ElementAccessExpression;
    }