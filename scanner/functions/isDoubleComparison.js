function isDoubleComparison(expression) {
        return expression.type === "LogicalExpression" &&
            expression.operator === "||" &&
            expression.left.type === "BinaryExpression" &&
            expression.left.operator === "===" &&
            expression.right.type === "BinaryExpression" &&
            expression.right.operator === "===";
    }