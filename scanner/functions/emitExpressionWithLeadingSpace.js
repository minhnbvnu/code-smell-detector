function emitExpressionWithLeadingSpace(node, parenthesizerRule) {
                if (node) {
                    writeSpace();
                    emitExpression(node, parenthesizerRule);
                }
            }