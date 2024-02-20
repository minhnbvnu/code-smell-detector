function removeAwait(fixer, node) {
                // Should always be an await node; but let's be safe.
                /* istanbul ignore if */ if (!util.isAwaitExpression(node)) {
                    return null;
                }
                const awaitToken = sourceCode.getFirstToken(node, util.isAwaitKeyword);
                // Should always be the case; but let's be safe.
                /* istanbul ignore if */ if (!awaitToken) {
                    return null;
                }
                const startAt = awaitToken.range[0];
                let endAt = awaitToken.range[1];
                // Also remove any extraneous whitespace after `await`, if there is any.
                const nextToken = sourceCode.getTokenAfter(awaitToken, {
                    includeComments: true,
                });
                if (nextToken) {
                    endAt = nextToken.range[0];
                }
                return fixer.removeRange([startAt, endAt]);
            }