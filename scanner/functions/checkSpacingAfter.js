function checkSpacingAfter(token) {
                if (!token.value.endsWith("${")) {
                    return; // ends with a backtick, this is the last template element in the template literal
                }
                const nextToken = sourceCode.getTokenAfter(token, { includeComments: true }), hasSpace = sourceCode.isSpaceBetween(token, nextToken);
                if (!astUtils.isTokenOnSameLine(token, nextToken)) {
                    return;
                }
                if (always && !hasSpace) {
                    context.report({
                        loc: {
                            start: {
                                line: token.loc.end.line,
                                column: token.loc.end.column - 2
                            },
                            end: token.loc.end
                        },
                        messageId: "expectedAfter",
                        fix: fixer => fixer.insertTextAfter(token, " ")
                    });
                }
                if (!always && hasSpace) {
                    context.report({
                        loc: {
                            start: token.loc.end,
                            end: nextToken.loc.start
                        },
                        messageId: "unexpectedAfter",
                        fix: fixer => fixer.removeRange([token.range[1], nextToken.range[0]])
                    });
                }
            }