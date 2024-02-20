function reportNoLineBreak(token) {
                const tokenBefore = sourceCode.getTokenBefore(token, { includeComments: true });
                context.report({
                    loc: {
                        start: tokenBefore.loc.end,
                        end: token.loc.start
                    },
                    messageId: "unexpectedLineBreak",
                    fix(fixer) {
                        if (astUtils.isCommentToken(tokenBefore)) {
                            return null;
                        }
                        if (!astUtils.isTokenOnSameLine(tokenBefore, token)) {
                            return fixer.replaceTextRange([tokenBefore.range[1], token.range[0]], " ");
                        }
                        /*
                         * This will check if the comma is on the same line as the next element
                         * Following array:
                         * [
                         *     1
                         *     , 2
                         *     , 3
                         * ]
                         *
                         * will be fixed to:
                         * [
                         *     1, 2, 3
                         * ]
                         */
                        const twoTokensBefore = sourceCode.getTokenBefore(tokenBefore, { includeComments: true });
                        if (astUtils.isCommentToken(twoTokensBefore)) {
                            return null;
                        }
                        return fixer.replaceTextRange([twoTokensBefore.range[1], tokenBefore.range[0]], "");
                    }
                });
            }