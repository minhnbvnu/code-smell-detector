function getSafeOutput(node, newRegExpValue) {
                const tokenBefore = sourceCode.getTokenBefore(node);
                const tokenAfter = sourceCode.getTokenAfter(node);
                return (tokenBefore && !canTokensBeAdjacent(tokenBefore, newRegExpValue) && tokenBefore.range[1] === node.range[0] ? " " : "") +
                    newRegExpValue +
                    (tokenAfter && !canTokensBeAdjacent(newRegExpValue, tokenAfter) && node.range[1] === tokenAfter.range[0] ? " " : "");
            }