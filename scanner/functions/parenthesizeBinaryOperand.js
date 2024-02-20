function parenthesizeBinaryOperand(binaryOperator, operand, isLeftSideOfBinary, leftOperand) {
                const skipped = skipPartiallyEmittedExpressions(operand);
                if (skipped.kind === 214 /* ParenthesizedExpression */) {
                    return operand;
                }
                return binaryOperandNeedsParentheses(binaryOperator, operand, isLeftSideOfBinary, leftOperand) ? factory2.createParenthesizedExpression(operand) : operand;
            }