function isBigIntLiteralExpression(expr) {
                return expr.kind === 9 /* BigIntLiteral */ || expr.kind === 221 /* PrefixUnaryExpression */ && expr.operator === 40 /* MinusToken */ && expr.operand.kind === 9 /* BigIntLiteral */;
            }