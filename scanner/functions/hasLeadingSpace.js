function hasLeadingSpace(token) {
                const tokenBefore = sourceCode.getTokenBefore(token);
                return tokenBefore && astUtils.isTokenOnSameLine(tokenBefore, token) && sourceCode.isSpaceBetweenTokens(tokenBefore, token);
            }