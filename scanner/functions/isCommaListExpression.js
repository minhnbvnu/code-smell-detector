function isCommaListExpression(node) {
        return node.kind === ts.SyntaxKind.CommaListExpression;
    }