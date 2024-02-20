function checkSpacing(node) {
                var _a;
                const isOptionalCall = util.isOptionalCallExpression(node);
                const closingParenToken = sourceCode.getLastToken(node);
                const lastCalleeTokenWithoutPossibleParens = sourceCode.getLastToken((_a = node.typeParameters) !== null && _a !== void 0 ? _a : node.callee);
                const openingParenToken = sourceCode.getFirstTokenBetween(lastCalleeTokenWithoutPossibleParens, closingParenToken, util.isOpeningParenToken);
                if (!openingParenToken || openingParenToken.range[1] >= node.range[1]) {
                    // new expression with no parens...
                    return;
                }
                const lastCalleeToken = sourceCode.getTokenBefore(openingParenToken, util.isNotOptionalChainPunctuator);
                const textBetweenTokens = text
                    .slice(lastCalleeToken.range[1], openingParenToken.range[0])
                    .replace(/\/\*.*?\*\//gu, '');
                const hasWhitespace = /\s/u.test(textBetweenTokens);
                const hasNewline = hasWhitespace && util.LINEBREAK_MATCHER.test(textBetweenTokens);
                if (option === 'never') {
                    if (hasWhitespace) {
                        return context.report({
                            node,
                            loc: lastCalleeToken.loc.start,
                            messageId: 'unexpectedWhitespace',
                            fix(fixer) {
                                /*
                                 * Only autofix if there is no newline
                                 * https://github.com/eslint/eslint/issues/7787
                                 */
                                if (!hasNewline &&
                                    // don't fix optional calls
                                    !isOptionalCall) {
                                    return fixer.removeRange([
                                        lastCalleeToken.range[1],
                                        openingParenToken.range[0],
                                    ]);
                                }
                                return null;
                            },
                        });
                    }
                }
                else if (isOptionalCall) {
                    // disallow:
                    // foo?. ();
                    // foo ?.();
                    // foo ?. ();
                    if (hasWhitespace || hasNewline) {
                        context.report({
                            node,
                            loc: lastCalleeToken.loc.start,
                            messageId: 'unexpectedWhitespace',
                        });
                    }
                }
                else {
                    if (!hasWhitespace) {
                        context.report({
                            node,
                            loc: lastCalleeToken.loc.start,
                            messageId: 'missing',
                            fix(fixer) {
                                return fixer.insertTextBefore(openingParenToken, ' ');
                            },
                        });
                    }
                    else if (!config.allowNewlines && hasNewline) {
                        context.report({
                            node,
                            loc: lastCalleeToken.loc.start,
                            messageId: 'unexpectedNewline',
                            fix(fixer) {
                                return fixer.replaceTextRange([lastCalleeToken.range[1], openingParenToken.range[0]], ' ');
                            },
                        });
                    }
                }
            }