function getOperatorToken(node) {
                return sourceCode.getFirstTokenBetween(node.left, node.right, token => token.value === node.operator);
            }