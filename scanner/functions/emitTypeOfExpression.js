function emitTypeOfExpression(node) {
                emitTokenWithComment(112 /* TypeOfKeyword */, node.pos, writeKeyword, node);
                writeSpace();
                emitExpression(node.expression, parenthesizer.parenthesizeOperandOfPrefixUnary);
            }