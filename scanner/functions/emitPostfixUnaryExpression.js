function emitPostfixUnaryExpression(node) {
                emitExpression(node.operand, parenthesizer.parenthesizeOperandOfPostfixUnary);
                writeTokenText(node.operator, writeOperator);
            }