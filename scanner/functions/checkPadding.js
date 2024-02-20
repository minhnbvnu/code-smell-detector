function checkPadding(node) {
                const openBrace = getOpenBrace(node), firstBlockToken = getFirstBlockToken(openBrace), tokenBeforeFirst = sourceCode.getTokenBefore(firstBlockToken, { includeComments: true }), closeBrace = sourceCode.getLastToken(node), lastBlockToken = getLastBlockToken(closeBrace), tokenAfterLast = sourceCode.getTokenAfter(lastBlockToken, { includeComments: true }), blockHasTopPadding = isPaddingBetweenTokens(tokenBeforeFirst, firstBlockToken), blockHasBottomPadding = isPaddingBetweenTokens(lastBlockToken, tokenAfterLast);
                if (options.allowSingleLineBlocks && astUtils.isTokenOnSameLine(tokenBeforeFirst, tokenAfterLast)) {
                    return;
                }
                if (requirePaddingFor(node)) {
                    if (!blockHasTopPadding) {
                        context.report({
                            node,
                            loc: {
                                start: tokenBeforeFirst.loc.start,
                                end: firstBlockToken.loc.start
                            },
                            fix(fixer) {
                                return fixer.insertTextAfter(tokenBeforeFirst, "\n");
                            },
                            messageId: "alwaysPadBlock"
                        });
                    }
                    if (!blockHasBottomPadding) {
                        context.report({
                            node,
                            loc: {
                                end: tokenAfterLast.loc.start,
                                start: lastBlockToken.loc.end
                            },
                            fix(fixer) {
                                return fixer.insertTextBefore(tokenAfterLast, "\n");
                            },
                            messageId: "alwaysPadBlock"
                        });
                    }
                }
                else {
                    if (blockHasTopPadding) {
                        context.report({
                            node,
                            loc: {
                                start: tokenBeforeFirst.loc.start,
                                end: firstBlockToken.loc.start
                            },
                            fix(fixer) {
                                return fixer.replaceTextRange([tokenBeforeFirst.range[1], firstBlockToken.range[0] - firstBlockToken.loc.start.column], "\n");
                            },
                            messageId: "neverPadBlock"
                        });
                    }
                    if (blockHasBottomPadding) {
                        context.report({
                            node,
                            loc: {
                                end: tokenAfterLast.loc.start,
                                start: lastBlockToken.loc.end
                            },
                            messageId: "neverPadBlock",
                            fix(fixer) {
                                return fixer.replaceTextRange([lastBlockToken.range[1], tokenAfterLast.range[0] - tokenAfterLast.loc.start.column], "\n");
                            }
                        });
                    }
                }
            }