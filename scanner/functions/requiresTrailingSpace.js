function requiresTrailingSpace(node) {
                const nextTwoTokens = sourceCode.getTokensAfter(node, { count: 2 });
                const rightParenToken = nextTwoTokens[0];
                const tokenAfterRightParen = nextTwoTokens[1];
                const tokenBeforeRightParen = sourceCode.getLastToken(node);
                return rightParenToken && tokenAfterRightParen &&
                    !sourceCode.isSpaceBetweenTokens(rightParenToken, tokenAfterRightParen) &&
                    !astUtils.canTokensBeAdjacent(tokenBeforeRightParen, tokenAfterRightParen);
            }