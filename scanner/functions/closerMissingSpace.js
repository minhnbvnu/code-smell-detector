function closerMissingSpace(tokenBeforeClosingParen, closingParenToken) {
                if (sourceCode.isSpaceBetweenTokens(tokenBeforeClosingParen, closingParenToken)) {
                    return false;
                }
                if (!options.empty && astUtils.isOpeningParenToken(tokenBeforeClosingParen)) {
                    return false;
                }
                if (ALWAYS) {
                    return !isCloserException(tokenBeforeClosingParen);
                }
                return isCloserException(tokenBeforeClosingParen);
            }