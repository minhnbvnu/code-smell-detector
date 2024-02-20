function emitSwitchStatement(node) {
                const openParenPos = emitTokenWithComment(107 /* SwitchKeyword */, node.pos, writeKeyword, node);
                writeSpace();
                emitTokenWithComment(20 /* OpenParenToken */, openParenPos, writePunctuation, node);
                emitExpression(node.expression);
                emitTokenWithComment(21 /* CloseParenToken */, node.expression.end, writePunctuation, node);
                writeSpace();
                emit(node.caseBlock);
            }