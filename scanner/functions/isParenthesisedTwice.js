function isParenthesisedTwice(node) {
                const previousToken = sourceCode.getTokenBefore(node, 1), nextToken = sourceCode.getTokenAfter(node, 1);
                return isParenthesised(node) && previousToken && nextToken &&
                    astUtils.isOpeningParenToken(previousToken) && previousToken.range[1] <= node.range[0] &&
                    astUtils.isClosingParenToken(nextToken) && nextToken.range[0] >= node.range[1];
            }