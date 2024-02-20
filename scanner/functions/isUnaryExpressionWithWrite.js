function isUnaryExpressionWithWrite(expr) {
            switch (expr.kind) {
                case 222 /* PostfixUnaryExpression */:
                    return true;
                case 221 /* PrefixUnaryExpression */:
                    return expr.operator === 45 /* PlusPlusToken */ || expr.operator === 46 /* MinusMinusToken */;
                default:
                    return false;
            }
        }