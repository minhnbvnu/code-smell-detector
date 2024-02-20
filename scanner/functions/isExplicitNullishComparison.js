function isExplicitNullishComparison(expression, scope) {
        if (!isDoubleComparison(expression)) {
            return false;
        }
        const leftReference = isReference(expression.left.left) ? "left" : "right";
        const leftNullish = leftReference === "left" ? "right" : "left";
        const rightReference = isReference(expression.right.left) ? "left" : "right";
        const rightNullish = rightReference === "left" ? "right" : "left";
        return astUtils.isSameReference(expression.left[leftReference], expression.right[rightReference]) &&
            ((astUtils.isNullLiteral(expression.left[leftNullish]) && isUndefined(expression.right[rightNullish], scope)) ||
                (isUndefined(expression.left[leftNullish], scope) && astUtils.isNullLiteral(expression.right[rightNullish])));
    }