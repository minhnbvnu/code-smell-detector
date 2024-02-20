function unwrapParentheses(node) {
        while (node.kind === ts.SyntaxKind.ParenthesizedExpression)
            node = node.expression;
        return node;
    }