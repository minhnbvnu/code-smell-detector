function getClosingParenOfParams(node) {
                return sourceCode.getTokenAfter(node.params[0], astUtils.isClosingParenToken);
            }