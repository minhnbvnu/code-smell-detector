function checkPrecedingSpace(node) {
                const precedingToken = sourceCode.getTokenBefore(node);
                if (precedingToken && util.isTokenOnSameLine(precedingToken, node)) {
                    // eslint-disable-next-line deprecation/deprecation -- TODO - switch once our min ESLint version is 6.7.0
                    const hasSpace = sourceCode.isSpaceBetweenTokens(precedingToken, node);
                    if (requireSpace && !hasSpace) {
                        context.report({
                            node,
                            messageId: 'missingSpace',
                            fix(fixer) {
                                return fixer.insertTextBefore(node, ' ');
                            },
                        });
                    }
                    else if (!requireSpace && hasSpace) {
                        context.report({
                            node,
                            messageId: 'unexpectedSpace',
                            fix(fixer) {
                                return fixer.removeRange([
                                    precedingToken.range[1],
                                    node.range[0],
                                ]);
                            },
                        });
                    }
                }
            }