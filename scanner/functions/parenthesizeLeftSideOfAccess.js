function parenthesizeLeftSideOfAccess(expression, optionalChain) {
                const emittedExpression = skipPartiallyEmittedExpressions(expression);
                if (isLeftHandSideExpression(emittedExpression) && (emittedExpression.kind !== 211 /* NewExpression */ || emittedExpression.arguments) && (optionalChain || !isOptionalChain(emittedExpression))) {
                    return expression;
                }
                return setTextRange(factory2.createParenthesizedExpression(expression), expression);
            }