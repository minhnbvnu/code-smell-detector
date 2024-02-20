function emitCatchClause(node) {
                const openParenPos = emitTokenWithComment(83 /* CatchKeyword */, node.pos, writeKeyword, node);
                writeSpace();
                if (node.variableDeclaration) {
                    emitTokenWithComment(20 /* OpenParenToken */, openParenPos, writePunctuation, node);
                    emit(node.variableDeclaration);
                    emitTokenWithComment(21 /* CloseParenToken */, node.variableDeclaration.end, writePunctuation, node);
                    writeSpace();
                }
                emit(node.block);
            }