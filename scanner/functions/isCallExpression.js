function isCallExpression(node) {
        return node.kind === ts.SyntaxKind.CallExpression;
    }