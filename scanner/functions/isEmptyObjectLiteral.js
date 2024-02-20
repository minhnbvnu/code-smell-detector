function isEmptyObjectLiteral(expression) {
            return expression.kind === 207 /* ObjectLiteralExpression */ && expression.properties.length === 0;
        }