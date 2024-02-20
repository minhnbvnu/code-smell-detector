function isDeleteExpression(node) {
        return node.kind === ts.SyntaxKind.DeleteExpression;
    }