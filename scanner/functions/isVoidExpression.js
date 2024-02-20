function isVoidExpression(node) {
        return node.kind === ts.SyntaxKind.VoidExpression;
    }