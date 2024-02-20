function unexpectSpaceAfter(token, pattern) {
                const nextToken = sourceCode.getTokenAfter(token);
                if (nextToken &&
                    (CHECK_TYPE.test(nextToken.type) || pattern.test(nextToken.value)) &&
                    !isCloseParenOfTemplate(nextToken) &&
                    !tokensToIgnore.has(nextToken) &&
                    astUtils.isTokenOnSameLine(token, nextToken) &&
                    sourceCode.isSpaceBetweenTokens(token, nextToken)) {
                    context.report({
                        loc: { start: token.loc.end, end: nextToken.loc.start },
                        messageId: "unexpectedAfter",
                        data: token,
                        fix(fixer) {
                            return fixer.removeRange([token.range[1], nextToken.range[0]]);
                        }
                    });
                }
            }