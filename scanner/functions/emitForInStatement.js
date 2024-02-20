function emitForInStatement(node) {
                const openParenPos = emitTokenWithComment(97 /* ForKeyword */, node.pos, writeKeyword, node);
                writeSpace();
                emitTokenWithComment(20 /* OpenParenToken */, openParenPos, writePunctuation, node);
                emitForBinding(node.initializer);
                writeSpace();
                emitTokenWithComment(101 /* InKeyword */, node.initializer.end, writeKeyword, node);
                writeSpace();
                emitExpression(node.expression);
                emitTokenWithComment(21 /* CloseParenToken */, node.expression.end, writePunctuation, node);
                emitEmbeddedStatement(node, node.statement);
            }