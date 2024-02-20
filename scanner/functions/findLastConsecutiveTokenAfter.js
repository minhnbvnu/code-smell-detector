function findLastConsecutiveTokenAfter(prevLastToken, nextFirstToken, maxLine) {
                const after = sourceCode.getTokenAfter(prevLastToken, { includeComments: true });
                if (after !== nextFirstToken && after.loc.start.line - prevLastToken.loc.end.line <= maxLine) {
                    return findLastConsecutiveTokenAfter(after, nextFirstToken, maxLine);
                }
                return prevLastToken;
            }