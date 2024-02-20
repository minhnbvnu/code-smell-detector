function checkForBreakAfter(node, messageId) {
                const openParen = sourceCode.getTokenAfter(node, astUtils.isNotClosingParenToken);
                const nodeExpressionEnd = sourceCode.getTokenBefore(openParen);
                if (openParen.loc.start.line !== nodeExpressionEnd.loc.end.line) {
                    context.report({
                        node,
                        loc: openParen.loc,
                        messageId
                    });
                }
            }