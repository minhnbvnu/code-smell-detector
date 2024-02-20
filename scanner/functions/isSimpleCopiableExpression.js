function isSimpleCopiableExpression(expression) {
            return isStringLiteralLike(expression) || expression.kind === 8 /* NumericLiteral */ || isKeyword(expression.kind) || isIdentifier(expression);
        }