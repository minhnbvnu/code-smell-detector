function splitByLogicalOperator(operator, node) {
        if (node.type === "LogicalExpression" && node.operator === operator) {
            return [...splitByLogicalOperator(operator, node.left), ...splitByLogicalOperator(operator, node.right)];
        }
        return [node];
    }