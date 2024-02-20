function openerRejectsSpace(openingParenToken, tokenAfterOpeningParen) {
                if (!astUtils.isTokenOnSameLine(openingParenToken, tokenAfterOpeningParen)) {
                    return false;
                }
                if (tokenAfterOpeningParen.type === "Line") {
                    return false;
                }
                if (!sourceCode.isSpaceBetweenTokens(openingParenToken, tokenAfterOpeningParen)) {
                    return false;
                }
                if (ALWAYS) {
                    return isOpenerException(tokenAfterOpeningParen);
                }
                return !isOpenerException(tokenAfterOpeningParen);
            }