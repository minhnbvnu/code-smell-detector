function isNarrowingBinaryExpression(expr) {
                switch (expr.operatorToken.kind) {
                    case 63 /* EqualsToken */:
                    case 75 /* BarBarEqualsToken */:
                    case 76 /* AmpersandAmpersandEqualsToken */:
                    case 77 /* QuestionQuestionEqualsToken */:
                        return containsNarrowableReference(expr.left);
                    case 34 /* EqualsEqualsToken */:
                    case 35 /* ExclamationEqualsToken */:
                    case 36 /* EqualsEqualsEqualsToken */:
                    case 37 /* ExclamationEqualsEqualsToken */:
                        return isNarrowableOperand(expr.left) || isNarrowableOperand(expr.right) || isNarrowingTypeofOperands(expr.right, expr.left) || isNarrowingTypeofOperands(expr.left, expr.right);
                    case 102 /* InstanceOfKeyword */:
                        return isNarrowableOperand(expr.left);
                    case 101 /* InKeyword */:
                        return isNarrowingExpression(expr.right);
                    case 27 /* CommaToken */:
                        return isNarrowingExpression(expr.right);
                }
                return false;
            }