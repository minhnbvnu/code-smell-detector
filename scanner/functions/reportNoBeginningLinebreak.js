function reportNoBeginningLinebreak(node, token) {
                context.report({
                    node,
                    loc: token.loc,
                    messageId: "unexpectedOpeningLinebreak",
                    fix(fixer) {
                        const nextToken = sourceCode.getTokenAfter(token, { includeComments: true });
                        if (astUtils.isCommentToken(nextToken)) {
                            return null;
                        }
                        return fixer.removeRange([token.range[1], nextToken.range[0]]);
                    }
                });
            }