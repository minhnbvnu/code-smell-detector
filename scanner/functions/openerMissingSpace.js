function openerMissingSpace(openingParenToken, tokenAfterOpeningParen) {
                if (sourceCode.isSpaceBetweenTokens(openingParenToken, tokenAfterOpeningParen)) {
                    return false;
                }
                if (!options.empty && astUtils.isClosingParenToken(tokenAfterOpeningParen)) {
                    return false;
                }
                if (ALWAYS) {
                    return !isOpenerException(tokenAfterOpeningParen);
                }
                return isOpenerException(tokenAfterOpeningParen);
            }