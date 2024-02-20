function emitTryStatement(node) {
                emitTokenWithComment(111 /* TryKeyword */, node.pos, writeKeyword, node);
                writeSpace();
                emit(node.tryBlock);
                if (node.catchClause) {
                    writeLineOrSpace(node, node.tryBlock, node.catchClause);
                    emit(node.catchClause);
                }
                if (node.finallyBlock) {
                    writeLineOrSpace(node, node.catchClause || node.tryBlock, node.finallyBlock);
                    emitTokenWithComment(96 /* FinallyKeyword */, (node.catchClause || node.tryBlock).end, writeKeyword, node);
                    writeSpace();
                    emit(node.finallyBlock);
                }
            }