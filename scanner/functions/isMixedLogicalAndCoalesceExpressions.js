function isMixedLogicalAndCoalesceExpressions(left, right) {
        return ((isLogicalExpression(left) && isCoalesceExpression(right)) ||
            (isCoalesceExpression(left) && isLogicalExpression(right)));
    }