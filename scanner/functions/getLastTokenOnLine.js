function getLastTokenOnLine(node) {
                const lastToken = sourceCode.getLastToken(node);
                const secondToLastToken = sourceCode.getTokenBefore(lastToken);
                return astUtils.isSemicolonToken(lastToken) && lastToken.loc.start.line > secondToLastToken.loc.end.line
                    ? secondToLastToken
                    : lastToken;
            }