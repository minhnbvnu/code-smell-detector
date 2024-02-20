function emitWithStatement(node) {
                const openParenPos = emitTokenWithComment(116 /* WithKeyword */, node.pos, writeKeyword, node);
                writeSpace();
                emitTokenWithComment(20 /* OpenParenToken */, openParenPos, writePunctuation, node);
                emitExpression(node.expression);
                emitTokenWithComment(21 /* CloseParenToken */, node.expression.end, writePunctuation, node);
                emitEmbeddedStatement(node, node.statement);
            }