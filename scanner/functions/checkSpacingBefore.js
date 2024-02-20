function checkSpacingBefore(token) {
                if (!token.value.startsWith("}")) {
                    return; // starts with a backtick, this is the first template element in the template literal
                }
                const prevToken = sourceCode.getTokenBefore(token, { includeComments: true }), hasSpace = sourceCode.isSpaceBetween(prevToken, token);
                if (!astUtils.isTokenOnSameLine(prevToken, token)) {
                    return;
                }
                if (always && !hasSpace) {
                    context.report({
                        loc: {
                            start: token.loc.start,
                            end: {
                                line: token.loc.start.line,
                                column: token.loc.start.column + 1
                            }
                        },
                        messageId: "expectedBefore",
                        fix: fixer => fixer.insertTextBefore(token, " ")
                    });
                }
                if (!always && hasSpace) {
                    context.report({
                        loc: {
                            start: prevToken.loc.end,
                            end: token.loc.start
                        },
                        messageId: "unexpectedBefore",
                        fix: fixer => fixer.removeRange([prevToken.range[1], token.range[0]])
                    });
                }
            }