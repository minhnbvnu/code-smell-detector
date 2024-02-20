function isRedundantSemi(semiToken) {
                const nextToken = sourceCode.getTokenAfter(semiToken);
                return (!nextToken ||
                    astUtils.isClosingBraceToken(nextToken) ||
                    astUtils.isSemicolonToken(nextToken));
            }