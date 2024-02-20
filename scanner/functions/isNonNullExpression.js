function isNonNullExpression(node) {
        return node.kind === ts.SyntaxKind.NonNullExpression;
    }