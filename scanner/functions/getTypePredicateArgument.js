function getTypePredicateArgument(predicate, callExpression) {
                if (predicate.kind === 1 /* Identifier */ || predicate.kind === 3 /* AssertsIdentifier */) {
                    return callExpression.arguments[predicate.parameterIndex];
                }
                const invokedExpression = skipParentheses(callExpression.expression);
                return isAccessExpression(invokedExpression) ? skipParentheses(invokedExpression.expression) : void 0;
            }