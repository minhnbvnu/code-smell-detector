function isSimpleLiteralEnumReference(expr) {
                if ((isPropertyAccessExpression(expr) || isElementAccessExpression(expr) && isStringOrNumberLiteralExpression(expr.argumentExpression)) && isEntityNameExpression(expr.expression)) {
                    return !!(checkExpressionCached(expr).flags & 1056 /* EnumLike */);
                }
            }