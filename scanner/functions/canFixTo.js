function canFixTo(node, pattern, flags) {
                const tokenBefore = sourceCode.getTokenBefore(node);
                return sourceCode.getCommentsInside(node).length === 0 &&
                    (!tokenBefore || validPrecedingTokens.has(tokenBefore.value)) &&
                    isValidRegexForEcmaVersion(pattern, flags);
            }