function isNarrowableReference(expr) {
                return isDottedName(expr) || (isPropertyAccessExpression(expr) || isNonNullExpression(expr) || isParenthesizedExpression(expr)) && isNarrowableReference(expr.expression) || isBinaryExpression(expr) && expr.operatorToken.kind === 27 /* CommaToken */ && isNarrowableReference(expr.right) || isElementAccessExpression(expr) && (isStringOrNumericLiteralLike(expr.argumentExpression) || isEntityNameExpression(expr.argumentExpression)) && isNarrowableReference(expr.expression) || isAssignmentExpression(expr) && isNarrowableReference(expr.left);
            }