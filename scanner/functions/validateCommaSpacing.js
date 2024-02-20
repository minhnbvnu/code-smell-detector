function validateCommaSpacing(commaToken, prevToken, nextToken) {
                if (prevToken &&
                    (0, util_1.isTokenOnSameLine)(prevToken, commaToken) &&
                    // eslint-disable-next-line deprecation/deprecation -- TODO - switch once our min ESLint version is 6.7.0
                    spaceBefore !== sourceCode.isSpaceBetweenTokens(prevToken, commaToken)) {
                    context.report({
                        node: commaToken,
                        data: {
                            loc: 'before',
                        },
                        messageId: spaceBefore ? 'missing' : 'unexpected',
                        fix: fixer => spaceBefore
                            ? fixer.insertTextBefore(commaToken, ' ')
                            : fixer.replaceTextRange([prevToken.range[1], commaToken.range[0]], ''),
                    });
                }
                if (nextToken && (0, util_1.isClosingParenToken)(nextToken)) {
                    return;
                }
                if (!spaceAfter && nextToken && nextToken.type === utils_1.AST_TOKEN_TYPES.Line) {
                    return;
                }
                if (nextToken &&
                    (0, util_1.isTokenOnSameLine)(commaToken, nextToken) &&
                    // eslint-disable-next-line deprecation/deprecation -- TODO - switch once our min ESLint version is 6.7.0
                    spaceAfter !== sourceCode.isSpaceBetweenTokens(commaToken, nextToken)) {
                    context.report({
                        node: commaToken,
                        data: {
                            loc: 'after',
                        },
                        messageId: spaceAfter ? 'missing' : 'unexpected',
                        fix: fixer => spaceAfter
                            ? fixer.insertTextAfter(commaToken, ' ')
                            : fixer.replaceTextRange([commaToken.range[1], nextToken.range[0]], ''),
                    });
                }
            }