function getInitializerOfBinaryExpression(expr) {
            while (isBinaryExpression(expr.right)) {
                expr = expr.right;
            }
            return expr.right;
        }