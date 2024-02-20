function identifierOrAccessExpressionPostfixMatchesParameterName(expr, parameterName) {
                if (isIdentifier(expr)) {
                    return expr.text === parameterName;
                }
                if (isPropertyAccessExpression(expr)) {
                    return expr.name.text === parameterName;
                }
                return false;
            }