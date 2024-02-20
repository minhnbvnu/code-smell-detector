function codeAroundComment(token) {
                let currentToken = token;
                do {
                    currentToken = sourceCode.getTokenBefore(currentToken, {
                        includeComments: true,
                    });
                } while (currentToken && util.isCommentToken(currentToken));
                if (currentToken && util.isTokenOnSameLine(currentToken, token)) {
                    return true;
                }
                currentToken = token;
                do {
                    currentToken = sourceCode.getTokenAfter(currentToken, {
                        includeComments: true,
                    });
                } while (currentToken && util.isCommentToken(currentToken));
                if (currentToken && util.isTokenOnSameLine(token, currentToken)) {
                    return true;
                }
                return false;
            }