function reportNoEndingLinebreak(node, token) {
                context.report({
                    node,
                    loc: token.loc,
                    messageId: "unexpectedClosingLinebreak",
                    fix(fixer) {
                        const previousToken = sourceCode.getTokenBefore(token, { includeComments: true });
                        if (astUtils.isCommentToken(previousToken)) {
                            return null;
                        }
                        return fixer.removeRange([previousToken.range[1], token.range[0]]);
                    }
                });
            }