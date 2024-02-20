function hasCommentsInParensOfParams(node, openingParen) {
                return sourceCode.commentsExistBetween(openingParen, getClosingParenOfParams(node));
            }