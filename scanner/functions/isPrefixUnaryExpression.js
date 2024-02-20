function isPrefixUnaryExpression(node) {
        return node.kind === ts.SyntaxKind.PrefixUnaryExpression;
    }