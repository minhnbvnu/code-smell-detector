function requiresLeadingSpace(node) {
                const leftParenToken = sourceCode.getTokenBefore(node);
                const tokenBeforeLeftParen = sourceCode.getTokenBefore(leftParenToken, { includeComments: true });
                const tokenAfterLeftParen = sourceCode.getTokenAfter(leftParenToken, { includeComments: true });
                return tokenBeforeLeftParen &&
                    tokenBeforeLeftParen.range[1] === leftParenToken.range[0] &&
                    leftParenToken.range[1] === tokenAfterLeftParen.range[0] &&
                    !astUtils.canTokensBeAdjacent(tokenBeforeLeftParen, tokenAfterLeftParen);
            }