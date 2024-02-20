function emitForStatement(node) {
                const openParenPos = emitTokenWithComment(97 /* ForKeyword */, node.pos, writeKeyword, node);
                writeSpace();
                let pos = emitTokenWithComment(20 /* OpenParenToken */, openParenPos, writePunctuation, 
                /*contextNode*/
                node);
                emitForBinding(node.initializer);
                pos = emitTokenWithComment(26 /* SemicolonToken */, node.initializer ? node.initializer.end : pos, writePunctuation, node);
                emitExpressionWithLeadingSpace(node.condition);
                pos = emitTokenWithComment(26 /* SemicolonToken */, node.condition ? node.condition.end : pos, writePunctuation, node);
                emitExpressionWithLeadingSpace(node.incrementor);
                emitTokenWithComment(21 /* CloseParenToken */, node.incrementor ? node.incrementor.end : pos, writePunctuation, node);
                emitEmbeddedStatement(node, node.statement);
            }