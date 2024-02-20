function isParenthesizedExpression(node) {
        return node.kind === ts.SyntaxKind.ParenthesizedExpression;
    }