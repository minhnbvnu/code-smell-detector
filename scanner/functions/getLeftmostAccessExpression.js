function getLeftmostAccessExpression(expr) {
            while (isAccessExpression(expr)) {
                expr = expr.expression;
            }
            return expr;
        }