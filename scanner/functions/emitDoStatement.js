function emitDoStatement(node) {
                emitTokenWithComment(90 /* DoKeyword */, node.pos, writeKeyword, node);
                emitEmbeddedStatement(node, node.statement);
                if (isBlock(node.statement) && !preserveSourceNewlines) {
                    writeSpace();
                }
                else {
                    writeLineOrSpace(node, node.statement, node.expression);
                }
                emitWhileClause(node, node.statement.end);
                writeTrailingSemicolon();
            }