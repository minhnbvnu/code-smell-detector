function hasTypeOfOperator(node) {
        const parent = node.parent;
        return parent.type === "UnaryExpression" && parent.operator === "typeof";
    }