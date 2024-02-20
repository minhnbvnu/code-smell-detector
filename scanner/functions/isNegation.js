function isNegation(node) {
        return node.type === "UnaryExpression" && node.operator === "!";
    }