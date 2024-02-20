function emitIfStatement(node) {
                const openParenPos = emitTokenWithComment(99 /* IfKeyword */, node.pos, writeKeyword, node);
                writeSpace();
                emitTokenWithComment(20 /* OpenParenToken */, openParenPos, writePunctuation, node);
                emitExpression(node.expression);
                emitTokenWithComment(21 /* CloseParenToken */, node.expression.end, writePunctuation, node);
                emitEmbeddedStatement(node, node.thenStatement);
                if (node.elseStatement) {
                    writeLineOrSpace(node, node.thenStatement, node.elseStatement);
                    emitTokenWithComment(91 /* ElseKeyword */, node.thenStatement.end, writeKeyword, node);
                    if (node.elseStatement.kind === 242 /* IfStatement */) {
                        writeSpace();
                        emit(node.elseStatement);
                    }
                    else {
                        emitEmbeddedStatement(node, node.elseStatement);
                    }
                }
            }