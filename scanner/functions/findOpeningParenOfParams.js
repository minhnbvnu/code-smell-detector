function findOpeningParenOfParams(node) {
                const tokenBeforeParams = sourceCode.getTokenBefore(node.params[0]);
                if (tokenBeforeParams &&
                    astUtils.isOpeningParenToken(tokenBeforeParams) &&
                    node.range[0] <= tokenBeforeParams.range[0]) {
                    return tokenBeforeParams;
                }
                return null;
            }