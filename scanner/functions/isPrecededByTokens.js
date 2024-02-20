function isPrecededByTokens(node, testTokens) {
                const tokenBefore = sourceCode.getTokenBefore(node);
                return testTokens.includes(tokenBefore.value);
            }