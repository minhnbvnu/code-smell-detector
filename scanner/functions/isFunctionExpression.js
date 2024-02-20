function isFunctionExpression(node) {
        return node.kind === ts.SyntaxKind.FunctionExpression;
    }