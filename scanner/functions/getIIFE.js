function getIIFE(func) {
        let node = func.parent;
        while (node.kind === ts.SyntaxKind.ParenthesizedExpression)
            node = node.parent;
        return node_1.isCallExpression(node) && func.end <= node.expression.end ? node : undefined;
    }