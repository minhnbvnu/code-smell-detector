function parenthesizeExpressionOfExportDefault(expression) {
                const check = skipPartiallyEmittedExpressions(expression);
                let needsParens = isCommaSequence(check);
                if (!needsParens) {
                    switch (getLeftmostExpression(check, 
                    /*stopAtCallExpression*/
                    false).kind) {
                        case 228 /* ClassExpression */:
                        case 215 /* FunctionExpression */:
                            needsParens = true;
                    }
                }
                return needsParens ? factory2.createParenthesizedExpression(expression) : expression;
            }