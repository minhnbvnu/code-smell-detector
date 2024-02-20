function isCoalesceExpression(node) {
        return node.type === "LogicalExpression" && node.operator === "??";
    }