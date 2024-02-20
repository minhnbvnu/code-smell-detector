function parenthesizeOperandOfPrefixUnary(operand) {
                return isUnaryExpression(operand) ? operand : setTextRange(factory2.createParenthesizedExpression(operand), operand);
            }