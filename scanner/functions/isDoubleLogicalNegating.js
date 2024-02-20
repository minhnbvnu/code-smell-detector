function isDoubleLogicalNegating(node) {
        return (node.operator === "!" &&
            node.argument.type === "UnaryExpression" &&
            node.argument.operator === "!");
    }