function restoreOuterExpressions(outerExpression, innerExpression, kinds = 15 /* All */) {
                if (outerExpression && isOuterExpression(outerExpression, kinds) && !isIgnorableParen(outerExpression)) {
                    return updateOuterExpression(outerExpression, restoreOuterExpressions(outerExpression.expression, innerExpression));
                }
                return innerExpression;
            }