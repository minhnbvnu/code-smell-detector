function isOmittedExpression(node) {
        return node.kind === ts.SyntaxKind.OmittedExpression;
    }