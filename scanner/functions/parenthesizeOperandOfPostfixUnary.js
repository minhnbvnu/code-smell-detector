function parenthesizeOperandOfPostfixUnary(operand) {
                return isLeftHandSideExpression(operand) ? operand : setTextRange(factory2.createParenthesizedExpression(operand), operand);
            }