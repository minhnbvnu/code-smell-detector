function isImplicitNullishComparison(expression, scope) {
        if (expression.type !== "BinaryExpression" || expression.operator !== "==") {
            return false;
        }
        const reference = isReference(expression.left) ? "left" : "right";
        const nullish = reference === "left" ? "right" : "left";
        return isReference(expression[reference]) &&
            (astUtils.isNullLiteral(expression[nullish]) || isUndefined(expression[nullish], scope));
    }