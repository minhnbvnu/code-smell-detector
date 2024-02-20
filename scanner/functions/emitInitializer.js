function emitInitializer(node, equalCommentStartPos, container, parenthesizerRule) {
                if (node) {
                    writeSpace();
                    emitTokenWithComment(63 /* EqualsToken */, equalCommentStartPos, writeOperator, container);
                    writeSpace();
                    emitExpression(node, parenthesizerRule);
                }
            }