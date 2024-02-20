function checkSpacingInsideBraces(node) {
                // Gets braces and the first/last token of content.
                const openBrace = getOpenBrace(node);
                const closeBrace = sourceCode.getLastToken(node);
                const firstToken = sourceCode.getTokenAfter(openBrace, {
                    includeComments: true,
                });
                const lastToken = sourceCode.getTokenBefore(closeBrace, {
                    includeComments: true,
                });
                // Skip if the node is invalid or empty.
                if (openBrace.type !== utils_1.AST_TOKEN_TYPES.Punctuator ||
                    openBrace.value !== '{' ||
                    closeBrace.type !== utils_1.AST_TOKEN_TYPES.Punctuator ||
                    closeBrace.value !== '}' ||
                    firstToken === closeBrace) {
                    return;
                }
                // Skip line comments for option never
                if (!always && firstToken.type === utils_1.AST_TOKEN_TYPES.Line) {
                    return;
                }
                if (!isValid(openBrace, firstToken)) {
                    let loc = openBrace.loc;
                    if (messageId === 'extra') {
                        loc = {
                            start: openBrace.loc.end,
                            end: firstToken.loc.start,
                        };
                    }
                    context.report({
                        node,
                        loc,
                        messageId,
                        data: {
                            location: 'after',
                            token: openBrace.value,
                        },
                        fix(fixer) {
                            if (always) {
                                return fixer.insertTextBefore(firstToken, ' ');
                            }
                            return fixer.removeRange([openBrace.range[1], firstToken.range[0]]);
                        },
                    });
                }
                if (!isValid(lastToken, closeBrace)) {
                    let loc = closeBrace.loc;
                    if (messageId === 'extra') {
                        loc = {
                            start: lastToken.loc.end,
                            end: closeBrace.loc.start,
                        };
                    }
                    context.report({
                        node,
                        loc,
                        messageId,
                        data: {
                            location: 'before',
                            token: closeBrace.value,
                        },
                        fix(fixer) {
                            if (always) {
                                return fixer.insertTextAfter(lastToken, ' ');
                            }
                            return fixer.removeRange([lastToken.range[1], closeBrace.range[0]]);
                        },
                    });
                }
            }