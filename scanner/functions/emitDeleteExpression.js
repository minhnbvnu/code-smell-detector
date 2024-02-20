function emitDeleteExpression(node) {
                emitTokenWithComment(89 /* DeleteKeyword */, node.pos, writeKeyword, node);
                writeSpace();
                emitExpression(node.expression, parenthesizer.parenthesizeOperandOfPrefixUnary);
            }