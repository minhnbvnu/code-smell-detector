function isBeforeClosingParen(token) {
                const nextToken = sourceCode.getTokenAfter(token);
                return (nextToken && astUtils.isClosingBraceToken(nextToken) || astUtils.isClosingParenToken(nextToken));
            }