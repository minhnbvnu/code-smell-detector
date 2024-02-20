function reportRequiredLineBreak(token) {
                const tokenBefore = sourceCode.getTokenBefore(token, { includeComments: true });
                context.report({
                    loc: {
                        start: tokenBefore.loc.end,
                        end: token.loc.start
                    },
                    messageId: "missingLineBreak",
                    fix(fixer) {
                        return fixer.replaceTextRange([tokenBefore.range[1], token.range[0]], "\n");
                    }
                });
            }