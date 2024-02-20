function emitYieldExpression(node) {
                emitTokenWithComment(125 /* YieldKeyword */, node.pos, writeKeyword, node);
                emit(node.asteriskToken);
                emitExpressionWithLeadingSpace(node.expression && parenthesizeExpressionForNoAsi(node.expression), parenthesizeExpressionForNoAsiAndDisallowedComma);
            }