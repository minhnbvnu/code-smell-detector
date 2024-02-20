function checkSemicolonSpacing(token, node) {
                if (astUtils.isSemicolonToken(token)) {
                    if (hasLeadingSpace(token)) {
                        if (!requireSpaceBefore) {
                            const tokenBefore = sourceCode.getTokenBefore(token);
                            const loc = {
                                start: tokenBefore.loc.end,
                                end: token.loc.start
                            };
                            context.report({
                                node,
                                loc,
                                messageId: "unexpectedWhitespaceBefore",
                                fix(fixer) {
                                    return fixer.removeRange([tokenBefore.range[1], token.range[0]]);
                                }
                            });
                        }
                    }
                    else {
                        if (requireSpaceBefore) {
                            const loc = token.loc;
                            context.report({
                                node,
                                loc,
                                messageId: "missingWhitespaceBefore",
                                fix(fixer) {
                                    return fixer.insertTextBefore(token, " ");
                                }
                            });
                        }
                    }
                    if (!isFirstTokenInCurrentLine(token) && !isLastTokenInCurrentLine(token) && !isBeforeClosingParen(token)) {
                        if (hasTrailingSpace(token)) {
                            if (!requireSpaceAfter) {
                                const tokenAfter = sourceCode.getTokenAfter(token);
                                const loc = {
                                    start: token.loc.end,
                                    end: tokenAfter.loc.start
                                };
                                context.report({
                                    node,
                                    loc,
                                    messageId: "unexpectedWhitespaceAfter",
                                    fix(fixer) {
                                        return fixer.removeRange([token.range[1], tokenAfter.range[0]]);
                                    }
                                });
                            }
                        }
                        else {
                            if (requireSpaceAfter) {
                                const loc = token.loc;
                                context.report({
                                    node,
                                    loc,
                                    messageId: "missingWhitespaceAfter",
                                    fix(fixer) {
                                        return fixer.insertTextAfter(token, " ");
                                    }
                                });
                            }
                        }
                    }
                }
            }