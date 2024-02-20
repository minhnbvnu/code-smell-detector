function hasUnexpectedTokensBeforeOpeningParen(node, openingParen) {
                const expectedCount = node.async ? 1 : 0;
                return sourceCode.getFirstToken(node, { skip: expectedCount }) !== openingParen;
            }