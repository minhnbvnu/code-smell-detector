function injectPendingExpressions(expression) {
                if (some(pendingExpressions)) {
                    if (isParenthesizedExpression(expression)) {
                        pendingExpressions.push(expression.expression);
                        expression = factory2.updateParenthesizedExpression(expression, factory2.inlineExpressions(pendingExpressions));
                    }
                    else {
                        pendingExpressions.push(expression);
                        expression = factory2.inlineExpressions(pendingExpressions);
                    }
                    pendingExpressions = void 0;
                }
                return expression;
            }