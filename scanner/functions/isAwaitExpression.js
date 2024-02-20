function isAwaitExpression(node) {
        return node.kind === ts.SyntaxKind.AwaitExpression;
    }