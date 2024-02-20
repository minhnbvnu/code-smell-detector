function emitSpreadAssignment(node) {
                if (node.expression) {
                    emitTokenWithComment(25 /* DotDotDotToken */, node.pos, writePunctuation, node);
                    emitExpression(node.expression, parenthesizer.parenthesizeExpressionForDisallowedComma);
                }
            }