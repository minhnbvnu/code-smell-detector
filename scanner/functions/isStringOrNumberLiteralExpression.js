function isStringOrNumberLiteralExpression(expr) {
                return isStringOrNumericLiteralLike(expr) || expr.kind === 221 /* PrefixUnaryExpression */ && expr.operator === 40 /* MinusToken */ && expr.operand.kind === 8 /* NumericLiteral */;
            }