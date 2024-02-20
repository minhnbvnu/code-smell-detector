function unexpectSpaceBefore(token, pattern) {
                const prevToken = sourceCode.getTokenBefore(token);
                if (prevToken &&
                    (CHECK_TYPE.test(prevToken.type) || pattern.test(prevToken.value)) &&
                    !isOpenParenOfTemplate(prevToken) &&
                    !tokensToIgnore.has(prevToken) &&
                    astUtils.isTokenOnSameLine(prevToken, token) &&
                    sourceCode.isSpaceBetweenTokens(prevToken, token)) {
                    context.report({
                        loc: { start: prevToken.loc.end, end: token.loc.start },
                        messageId: "unexpectedBefore",
                        data: token,
                        fix(fixer) {
                            return fixer.removeRange([prevToken.range[1], token.range[0]]);
                        }
                    });
                }
            }