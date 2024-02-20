function closerRejectsSpace(tokenBeforeClosingParen, closingParenToken) {
                if (!astUtils.isTokenOnSameLine(tokenBeforeClosingParen, closingParenToken)) {
                    return false;
                }
                if (!sourceCode.isSpaceBetweenTokens(tokenBeforeClosingParen, closingParenToken)) {
                    return false;
                }
                if (ALWAYS) {
                    return isCloserException(tokenBeforeClosingParen);
                }
                return !isCloserException(tokenBeforeClosingParen);
            }