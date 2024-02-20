function reportNoBeginningSpace(node, token) {
                const nextToken = context
                    .getSourceCode()
                    .getTokenAfter(token, { includeComments: true });
                context.report({
                    node,
                    loc: { start: token.loc.end, end: nextToken.loc.start },
                    messageId: 'unexpectedSpaceAfter',
                    data: {
                        token: token.value,
                    },
                    fix(fixer) {
                        return fixer.removeRange([token.range[1], nextToken.range[0]]);
                    },
                });
            }