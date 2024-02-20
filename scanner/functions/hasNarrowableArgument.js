function hasNarrowableArgument(expr) {
                if (expr.arguments) {
                    for (const argument of expr.arguments) {
                        if (containsNarrowableReference(argument)) {
                            return true;
                        }
                    }
                }
                if (expr.expression.kind === 208 /* PropertyAccessExpression */ && containsNarrowableReference(expr.expression.expression)) {
                    return true;
                }
                return false;
            }