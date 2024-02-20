function emitSpreadElement(node) {
                emitTokenWithComment(25 /* DotDotDotToken */, node.pos, writePunctuation, node);
                emitExpression(node.expression, parenthesizer.parenthesizeExpressionForDisallowedComma);
            }