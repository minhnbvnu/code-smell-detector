function hasSameTokens(nodeA, nodeB) {
                const tokensA = sourceCode.getTokens(nodeA);
                const tokensB = sourceCode.getTokens(nodeB);
                return tokensA.length === tokensB.length &&
                    tokensA.every((token, index) => token.type === tokensB[index].type && token.value === tokensB[index].value);
            }