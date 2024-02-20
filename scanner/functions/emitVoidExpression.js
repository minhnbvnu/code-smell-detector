function emitVoidExpression(node) {
                emitTokenWithComment(114 /* VoidKeyword */, node.pos, writeKeyword, node);
                writeSpace();
                emitExpression(node.expression, parenthesizer.parenthesizeOperandOfPrefixUnary);
            }