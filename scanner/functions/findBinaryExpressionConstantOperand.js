function findBinaryExpressionConstantOperand(scope, a, b, operator) {
        if (operator === "==" || operator === "!=") {
            if ((isNullOrUndefined(scope, a) && hasConstantNullishness(scope, b, false)) ||
                (isStaticBoolean(scope, a) && hasConstantLooseBooleanComparison(scope, b))) {
                return b;
            }
        }
        else if (operator === "===" || operator === "!==") {
            if ((isNullOrUndefined(scope, a) && hasConstantNullishness(scope, b, false)) ||
                (isStaticBoolean(scope, a) && hasConstantStrictBooleanComparison(scope, b))) {
                return b;
            }
        }
        return null;
    }