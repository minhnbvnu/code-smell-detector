function isSameTokens(node1, node2) {
                const tokens1 = sourceCode.getTokens(node1);
                const tokens2 = sourceCode.getTokens(node2);
                if (tokens1.length !== tokens2.length) {
                    return false;
                }
                for (let i = 0; i < tokens1.length; ++i) {
                    const token1 = tokens1[i];
                    const token2 = tokens2[i];
                    if (token1.type !== token2.type || token1.value !== token2.value) {
                        return false;
                    }
                }
                return true;
            }