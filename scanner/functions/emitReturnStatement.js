function emitReturnStatement(node) {
                emitTokenWithComment(105 /* ReturnKeyword */, node.pos, writeKeyword, 
                /*contextNode*/
                node);
                emitExpressionWithLeadingSpace(node.expression && parenthesizeExpressionForNoAsi(node.expression), parenthesizeExpressionForNoAsi);
                writeTrailingSemicolon();
            }