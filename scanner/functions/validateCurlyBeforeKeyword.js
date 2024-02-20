function validateCurlyBeforeKeyword(curlyToken) {
                const keywordToken = sourceCode.getTokenAfter(curlyToken);
                if (style === "1tbs" && !astUtils.isTokenOnSameLine(curlyToken, keywordToken)) {
                    context.report({
                        node: curlyToken,
                        messageId: "nextLineClose",
                        fix: removeNewlineBetween(curlyToken, keywordToken)
                    });
                }
                if (style !== "1tbs" && astUtils.isTokenOnSameLine(curlyToken, keywordToken)) {
                    context.report({
                        node: curlyToken,
                        messageId: "sameLineClose",
                        fix: fixer => fixer.insertTextAfter(curlyToken, "\n")
                    });
                }
            }