function emitPrefixUnaryExpression(node) {
                writeTokenText(node.operator, writeOperator);
                if (shouldEmitWhitespaceBeforeOperand(node)) {
                    writeSpace();
                }
                emitExpression(node.operand, parenthesizer.parenthesizeOperandOfPrefixUnary);
            }