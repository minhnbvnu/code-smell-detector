function isNewExpressionWithParens(newExpression) {
                const lastToken = sourceCode.getLastToken(newExpression);
                const penultimateToken = sourceCode.getTokenBefore(lastToken);
                return newExpression.arguments.length > 0 ||
                    (
                    // The expression should end with its own parens, e.g., new new foo() is not a new expression with parens
                    astUtils.isOpeningParenToken(penultimateToken) &&
                        astUtils.isClosingParenToken(lastToken) &&
                        newExpression.callee.range[1] < newExpression.range[1]);
            }