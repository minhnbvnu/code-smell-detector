function emitTypeAssertionExpression(node) {
                writePunctuation("<");
                emit(node.type);
                writePunctuation(">");
                emitExpression(node.expression, parenthesizer.parenthesizeOperandOfPrefixUnary);
            }