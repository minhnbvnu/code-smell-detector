function getParentOfBinaryExpression(expr) {
                while (isBinaryExpression(expr.parent)) {
                    expr = expr.parent;
                }
                return expr.parent;
            }