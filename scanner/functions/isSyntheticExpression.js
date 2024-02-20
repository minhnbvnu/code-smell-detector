function isSyntheticExpression(node) {
        return node.kind === ts.SyntaxKind.SyntheticExpression;
    }