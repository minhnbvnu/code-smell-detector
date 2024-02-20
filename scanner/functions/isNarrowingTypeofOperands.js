function isNarrowingTypeofOperands(expr1, expr2) {
                return isTypeOfExpression(expr1) && isNarrowableOperand(expr1.expression) && isStringLiteralLike(expr2);
            }