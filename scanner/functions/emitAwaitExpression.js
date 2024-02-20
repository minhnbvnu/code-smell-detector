function emitAwaitExpression(node) {
                emitTokenWithComment(133 /* AwaitKeyword */, node.pos, writeKeyword, node);
                writeSpace();
                emitExpression(node.expression, parenthesizer.parenthesizeOperandOfPrefixUnary);
            }