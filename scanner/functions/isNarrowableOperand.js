function isNarrowableOperand(expr) {
                switch (expr.kind) {
                    case 214 /* ParenthesizedExpression */:
                        return isNarrowableOperand(expr.expression);
                    case 223 /* BinaryExpression */:
                        switch (expr.operatorToken.kind) {
                            case 63 /* EqualsToken */:
                                return isNarrowableOperand(expr.left);
                            case 27 /* CommaToken */:
                                return isNarrowableOperand(expr.right);
                        }
                }
                return containsNarrowableReference(expr);
            }