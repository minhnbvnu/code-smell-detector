function emitForOfStatement(node) {
                const openParenPos = emitTokenWithComment(97 /* ForKeyword */, node.pos, writeKeyword, node);
                writeSpace();
                emitWithTrailingSpace(node.awaitModifier);
                emitTokenWithComment(20 /* OpenParenToken */, openParenPos, writePunctuation, node);
                emitForBinding(node.initializer);
                writeSpace();
                emitTokenWithComment(162 /* OfKeyword */, node.initializer.end, writeKeyword, node);
                writeSpace();
                emitExpression(node.expression);
                emitTokenWithComment(21 /* CloseParenToken */, node.expression.end, writePunctuation, node);
                emitEmbeddedStatement(node, node.statement);
            }