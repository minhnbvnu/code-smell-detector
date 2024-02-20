function emitThrowStatement(node) {
                emitTokenWithComment(109 /* ThrowKeyword */, node.pos, writeKeyword, node);
                emitExpressionWithLeadingSpace(parenthesizeExpressionForNoAsi(node.expression), parenthesizeExpressionForNoAsi);
                writeTrailingSemicolon();
            }