function findFirstConsecutiveTokenBefore(nextFirstToken, prevLastToken, maxLine) {
                const before = sourceCode.getTokenBefore(nextFirstToken, { includeComments: true });
                if (before !== prevLastToken && nextFirstToken.loc.start.line - before.loc.end.line <= maxLine) {
                    return findFirstConsecutiveTokenBefore(before, prevLastToken, maxLine);
                }
                return nextFirstToken;
            }