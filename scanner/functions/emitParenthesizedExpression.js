function emitParenthesizedExpression(node) {
                const openParenPos = emitTokenWithComment(20 /* OpenParenToken */, node.pos, writePunctuation, node);
                const indented = writeLineSeparatorsAndIndentBefore(node.expression, node);
                emitExpression(node.expression, 
                /*parenthesizerRules*/
                void 0);
                writeLineSeparatorsAfter(node.expression, node);
                decreaseIndentIf(indented);
                emitTokenWithComment(21 /* CloseParenToken */, node.expression ? node.expression.end : openParenPos, writePunctuation, node);
            }