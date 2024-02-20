function hasNewlineAfter(node) {
                const lastToken = getLastTokenOnLine(node);
                const tokenAfter = sourceCode.getTokenAfter(lastToken, { includeComments: true });
                return tokenAfter.loc.start.line - lastToken.loc.end.line >= 2;
            }