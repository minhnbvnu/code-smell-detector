function isBinaryExpression(node) {
        return node.kind === ts.SyntaxKind.BinaryExpression;
    }