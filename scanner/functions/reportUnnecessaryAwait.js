function reportUnnecessaryAwait(node) {
                context.report({
                    node: context.getSourceCode().getFirstToken(node),
                    loc: node.loc,
                    messageId: "redundantUseOfAwait",
                    suggest: [
                        {
                            messageId: "removeAwait",
                            fix(fixer) {
                                const sourceCode = context.getSourceCode();
                                const [awaitToken, tokenAfterAwait] = sourceCode.getFirstTokens(node, 2);
                                const areAwaitAndAwaitedExpressionOnTheSameLine = awaitToken.loc.start.line === tokenAfterAwait.loc.start.line;
                                if (!areAwaitAndAwaitedExpressionOnTheSameLine) {
                                    return null;
                                }
                                const [startOfAwait, endOfAwait] = awaitToken.range;
                                const characterAfterAwait = sourceCode.text[endOfAwait];
                                const trimLength = characterAfterAwait === " " ? 1 : 0;
                                const range = [startOfAwait, endOfAwait + trimLength];
                                return fixer.removeRange(range);
                            }
                        }
                    ]
                });
            }