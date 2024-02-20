function parenthesizeExpressionOfExpressionStatement(expression) {
                const emittedExpression = skipPartiallyEmittedExpressions(expression);
                if (isCallExpression(emittedExpression)) {
                    const callee = emittedExpression.expression;
                    const kind = skipPartiallyEmittedExpressions(callee).kind;
                    if (kind === 215 /* FunctionExpression */ || kind === 216 /* ArrowFunction */) {
                        const updated = factory2.updateCallExpression(emittedExpression, setTextRange(factory2.createParenthesizedExpression(callee), callee), emittedExpression.typeArguments, emittedExpression.arguments);
                        return factory2.restoreOuterExpressions(expression, updated, 8 /* PartiallyEmittedExpressions */);
                    }
                }
                const leftmostExpressionKind = getLeftmostExpression(emittedExpression, 
                /*stopAtCallExpressions*/
                false).kind;
                if (leftmostExpressionKind === 207 /* ObjectLiteralExpression */ || leftmostExpressionKind === 215 /* FunctionExpression */) {
                    return setTextRange(factory2.createParenthesizedExpression(expression), expression);
                }
                return expression;
            }