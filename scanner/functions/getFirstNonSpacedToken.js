function getFirstNonSpacedToken(left, right, op) {
                const operator = sourceCode.getFirstTokenBetween(left, right, token => token.value === op);
                const prev = sourceCode.getTokenBefore(operator);
                const next = sourceCode.getTokenAfter(operator);
                if (!sourceCode.isSpaceBetweenTokens(prev, operator) || !sourceCode.isSpaceBetweenTokens(operator, next)) {
                    return operator;
                }
                return null;
            }