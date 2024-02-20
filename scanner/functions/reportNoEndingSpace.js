function reportNoEndingSpace(node, token) {
                const previousToken = context
                    .getSourceCode()
                    .getTokenBefore(token, { includeComments: true });
                context.report({
                    node,
                    loc: { start: previousToken.loc.end, end: token.loc.start },
                    messageId: 'unexpectedSpaceBefore',
                    data: {
                        token: token.value,
                    },
                    fix(fixer) {
                        return fixer.removeRange([previousToken.range[1], token.range[0]]);
                    },
                });
            }