function getNameOrArgument(expr) {
            if (isPropertyAccessExpression(expr)) {
                return expr.name;
            }
            return expr.argumentExpression;
        }