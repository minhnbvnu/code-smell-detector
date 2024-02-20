function parenthesizeExpressionOfNew(expression) {
                const leftmostExpr = getLeftmostExpression(expression, 
                /*stopAtCallExpressions*/
                true);
                switch (leftmostExpr.kind) {
                    case 210 /* CallExpression */:
                        return factory2.createParenthesizedExpression(expression);
                    case 211 /* NewExpression */:
                        return !leftmostExpr.arguments ? factory2.createParenthesizedExpression(expression) : expression;
                }
                return parenthesizeLeftSideOfAccess(expression);
            }