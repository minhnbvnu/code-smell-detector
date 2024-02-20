function isNegativeNumericLiteral(node) {
        return (node.type === "UnaryExpression" &&
            node.operator === "-" &&
            node.prefix &&
            astUtils.isNumericLiteral(node.argument));
    }