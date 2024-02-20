function isEmptyArrayLiteral(expression) {
            return expression.kind === 206 /* ArrayLiteralExpression */ && expression.elements.length === 0;
        }