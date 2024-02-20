function isConcatenation(node) {
        return node.type === "BinaryExpression" && node.operator === "+";
    }