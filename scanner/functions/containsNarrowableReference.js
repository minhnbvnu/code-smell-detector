function containsNarrowableReference(expr) {
                return isNarrowableReference(expr) || isOptionalChain(expr) && containsNarrowableReference(expr.expression);
            }