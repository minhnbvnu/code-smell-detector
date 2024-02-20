function emitWhileClause(node, startPos) {
                const openParenPos = emitTokenWithComment(115 /* WhileKeyword */, startPos, writeKeyword, node);
                writeSpace();
                emitTokenWithComment(20 /* OpenParenToken */, openParenPos, writePunctuation, node);
                emitExpression(node.expression);
                emitTokenWithComment(21 /* CloseParenToken */, node.expression.end, writePunctuation, node);
            }