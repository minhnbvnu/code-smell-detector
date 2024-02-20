function isLogicalExpression(node) {
        return (node.type === "LogicalExpression" &&
            (node.operator === "&&" || node.operator === "||"));
    }