function hasTrailingSpace(token) {
                const tokenAfter = sourceCode.getTokenAfter(token);
                return tokenAfter && astUtils.isTokenOnSameLine(token, tokenAfter) && sourceCode.isSpaceBetweenTokens(token, tokenAfter);
            }