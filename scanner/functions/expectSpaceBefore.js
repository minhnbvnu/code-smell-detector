function expectSpaceBefore(token, pattern) {
                const prevToken = sourceCode.getTokenBefore(token);
                if (prevToken &&
                    (CHECK_TYPE.test(prevToken.type) || pattern.test(prevToken.value)) &&
                    !isOpenParenOfTemplate(prevToken) &&
                    !tokensToIgnore.has(prevToken) &&
                    astUtils.isTokenOnSameLine(prevToken, token) &&
                    !sourceCode.isSpaceBetweenTokens(prevToken, token)) {
                    context.report({
                        loc: token.loc,
                        messageId: "expectedBefore",
                        data: token,
                        fix(fixer) {
                            return fixer.insertTextBefore(token, " ");
                        }
                    });
                }
            }