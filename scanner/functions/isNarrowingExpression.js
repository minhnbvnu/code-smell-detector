function isNarrowingExpression(expr) {
                switch (expr.kind) {
                    case 79 /* Identifier */:
                    case 80 /* PrivateIdentifier */:
                    case 108 /* ThisKeyword */:
                    case 208 /* PropertyAccessExpression */:
                    case 209 /* ElementAccessExpression */:
                        return containsNarrowableReference(expr);
                    case 210 /* CallExpression */:
                        return hasNarrowableArgument(expr);
                    case 214 /* ParenthesizedExpression */:
                    case 232 /* NonNullExpression */:
                        return isNarrowingExpression(expr.expression);
                    case 223 /* BinaryExpression */:
                        return isNarrowingBinaryExpression(expr);
                    case 221 /* PrefixUnaryExpression */:
                        return expr.operator === 53 /* ExclamationToken */ && isNarrowingExpression(expr.operand);
                    case 218 /* TypeOfExpression */:
                        return isNarrowingExpression(expr.expression);
                }
                return false;
            }