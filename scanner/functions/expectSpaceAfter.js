function expectSpaceAfter(token, pattern) {
                const nextToken = sourceCode.getTokenAfter(token);
                if (nextToken &&
                    (CHECK_TYPE.test(nextToken.type) || pattern.test(nextToken.value)) &&
                    !isCloseParenOfTemplate(nextToken) &&
                    !tokensToIgnore.has(nextToken) &&
                    astUtils.isTokenOnSameLine(token, nextToken) &&
                    !sourceCode.isSpaceBetweenTokens(token, nextToken)) {
                    context.report({
                        loc: token.loc,
                        messageId: "expectedAfter",
                        data: token,
                        fix(fixer) {
                            return fixer.insertTextAfter(token, " ");
                        }
                    });
                }
            }