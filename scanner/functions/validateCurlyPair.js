function validateCurlyPair(openingCurlyToken, closingCurlyToken) {
                if (allowSingleLine &&
                    (0, util_1.isTokenOnSameLine)(openingCurlyToken, closingCurlyToken)) {
                    return;
                }
                const tokenBeforeOpeningCurly = sourceCode.getTokenBefore(openingCurlyToken);
                const tokenBeforeClosingCurly = sourceCode.getTokenBefore(closingCurlyToken);
                const tokenAfterOpeningCurly = sourceCode.getTokenAfter(openingCurlyToken);
                if (!isAllmanStyle &&
                    !(0, util_1.isTokenOnSameLine)(tokenBeforeOpeningCurly, openingCurlyToken)) {
                    context.report({
                        node: openingCurlyToken,
                        messageId: 'nextLineOpen',
                        fix: fixer => {
                            const textRange = [
                                tokenBeforeOpeningCurly.range[1],
                                openingCurlyToken.range[0],
                            ];
                            const textBetween = sourceCode.text.slice(textRange[0], textRange[1]);
                            if (textBetween.trim()) {
                                return null;
                            }
                            return fixer.replaceTextRange(textRange, ' ');
                        },
                    });
                }
                if (isAllmanStyle &&
                    (0, util_1.isTokenOnSameLine)(tokenBeforeOpeningCurly, openingCurlyToken)) {
                    context.report({
                        node: openingCurlyToken,
                        messageId: 'sameLineOpen',
                        fix: fixer => fixer.insertTextBefore(openingCurlyToken, '\n'),
                    });
                }
                if ((0, util_1.isTokenOnSameLine)(openingCurlyToken, tokenAfterOpeningCurly) &&
                    tokenAfterOpeningCurly !== closingCurlyToken) {
                    context.report({
                        node: openingCurlyToken,
                        messageId: 'blockSameLine',
                        fix: fixer => fixer.insertTextAfter(openingCurlyToken, '\n'),
                    });
                }
                if ((0, util_1.isTokenOnSameLine)(tokenBeforeClosingCurly, closingCurlyToken) &&
                    tokenBeforeClosingCurly !== openingCurlyToken) {
                    context.report({
                        node: closingCurlyToken,
                        messageId: 'singleLineClose',
                        fix: fixer => fixer.insertTextBefore(closingCurlyToken, '\n'),
                    });
                }
            }