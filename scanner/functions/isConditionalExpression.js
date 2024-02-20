function isConditionalExpression(node) {
        return node.kind === ts.SyntaxKind.ConditionalExpression;
    }