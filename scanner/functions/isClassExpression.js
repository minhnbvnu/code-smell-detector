function isClassExpression(node) {
        return node.kind === ts.SyntaxKind.ClassExpression;
    }