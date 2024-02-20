function isBindableObjectDefinePropertyCall(node) {
        return node.arguments.length === 3 &&
            node_1.isEntityNameExpression(node.arguments[0]) &&
            node_1.isNumericOrStringLikeLiteral(node.arguments[1]) &&
            node_1.isPropertyAccessExpression(node.expression) &&
            node.expression.name.escapedText === 'defineProperty' &&
            node_1.isIdentifier(node.expression.expression) &&
            node.expression.expression.escapedText === 'Object';
    }