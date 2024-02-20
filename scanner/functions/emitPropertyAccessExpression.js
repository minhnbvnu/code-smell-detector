function emitPropertyAccessExpression(node) {
                emitExpression(node.expression, parenthesizer.parenthesizeLeftSideOfAccess);
                const token = node.questionDotToken || setTextRangePosEnd(factory.createToken(24 /* DotToken */), node.expression.end, node.name.pos);
                const linesBeforeDot = getLinesBetweenNodes(node, node.expression, token);
                const linesAfterDot = getLinesBetweenNodes(node, token, node.name);
                writeLinesAndIndent(linesBeforeDot, 
                /*writeSpaceIfNotIndenting*/
                false);
                const shouldEmitDotDot = token.kind !== 28 /* QuestionDotToken */ && mayNeedDotDotForPropertyAccess(node.expression) && !writer.hasTrailingComment() && !writer.hasTrailingWhitespace();
                if (shouldEmitDotDot) {
                    writePunctuation(".");
                }
                if (node.questionDotToken) {
                    emit(token);
                }
                else {
                    emitTokenWithComment(token.kind, node.expression.end, writePunctuation, node);
                }
                writeLinesAndIndent(linesAfterDot, 
                /*writeSpaceIfNotIndenting*/
                false);
                emit(node.name);
                decreaseIndentIf(linesBeforeDot, linesAfterDot);
            }