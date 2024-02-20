function isLastTokenInCurrentLine(token) {
                const tokenAfter = sourceCode.getTokenAfter(token);
                return !(tokenAfter && astUtils.isTokenOnSameLine(token, tokenAfter));
            }