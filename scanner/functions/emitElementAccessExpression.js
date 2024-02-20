function emitElementAccessExpression(node) {
                emitExpression(node.expression, parenthesizer.parenthesizeLeftSideOfAccess);
                emit(node.questionDotToken);
                emitTokenWithComment(22 /* OpenBracketToken */, node.expression.end, writePunctuation, node);
                emitExpression(node.argumentExpression);
                emitTokenWithComment(23 /* CloseBracketToken */, node.argumentExpression.end, writePunctuation, node);
            }