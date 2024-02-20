function hasMatchingArgument(expression, reference) {
                if (expression.arguments) {
                    for (const argument of expression.arguments) {
                        if (isOrContainsMatchingReference(reference, argument)) {
                            return true;
                        }
                    }
                }
                if (expression.expression.kind === 208 /* PropertyAccessExpression */ && isOrContainsMatchingReference(reference, expression.expression.expression)) {
                    return true;
                }
                return false;
            }