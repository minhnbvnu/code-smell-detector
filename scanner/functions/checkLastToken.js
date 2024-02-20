function checkLastToken(member, opts, isLast) {
                /**
                 * Resolves the boolean value for the given setting enum value
                 * @param type the option name
                 */
                function getOption(type) {
                    if (isLast && !opts.requireLast) {
                        // only turn the option on if its expecting no delimiter for the last member
                        return type === 'none';
                    }
                    return opts.delimiter === type;
                }
                let messageId = null;
                let missingDelimiter = false;
                const lastToken = sourceCode.getLastToken(member, {
                    includeComments: false,
                });
                if (!lastToken) {
                    return;
                }
                const commentsAfterLastToken = sourceCode
                    .getCommentsAfter(lastToken)
                    .pop();
                const sourceCodeLines = sourceCode.getLines();
                const lastTokenLine = sourceCodeLines[(lastToken === null || lastToken === void 0 ? void 0 : lastToken.loc.start.line) - 1];
                const optsSemi = getOption('semi');
                const optsComma = getOption('comma');
                const optsNone = getOption('none');
                if (lastToken.value === ';') {
                    if (optsComma) {
                        messageId = 'expectedComma';
                    }
                    else if (optsNone) {
                        missingDelimiter = true;
                        messageId = 'unexpectedSemi';
                    }
                }
                else if (lastToken.value === ',') {
                    if (optsSemi) {
                        messageId = 'expectedSemi';
                    }
                    else if (optsNone) {
                        missingDelimiter = true;
                        messageId = 'unexpectedComma';
                    }
                }
                else {
                    if (optsSemi) {
                        missingDelimiter = true;
                        messageId = 'expectedSemi';
                    }
                    else if (optsComma) {
                        missingDelimiter = true;
                        messageId = 'expectedComma';
                    }
                }
                if (messageId) {
                    context.report({
                        node: lastToken,
                        loc: {
                            start: {
                                line: lastToken.loc.end.line,
                                column: lastToken.loc.end.column,
                            },
                            end: {
                                line: lastToken.loc.end.line,
                                column: lastToken.loc.end.column,
                            },
                        },
                        messageId,
                        fix: makeFixFunction({
                            optsNone,
                            optsSemi,
                            lastToken,
                            commentsAfterLastToken,
                            missingDelimiter,
                            lastTokenLine,
                            isSingleLine: opts.type === 'single-line',
                        }),
                    });
                }
            }