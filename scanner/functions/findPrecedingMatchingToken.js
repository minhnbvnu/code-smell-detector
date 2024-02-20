function findPrecedingMatchingToken(token, matchingTokenKind, sourceFile) {
            const closeTokenText = tokenToString(token.kind);
            const matchingTokenText = tokenToString(matchingTokenKind);
            const tokenFullStart = token.getFullStart();
            const bestGuessIndex = sourceFile.text.lastIndexOf(matchingTokenText, tokenFullStart);
            if (bestGuessIndex === -1) {
                return void 0;
            }
            if (sourceFile.text.lastIndexOf(closeTokenText, tokenFullStart - 1) < bestGuessIndex) {
                const nodeAtGuess = findPrecedingToken(bestGuessIndex + 1, sourceFile);
                if (nodeAtGuess && nodeAtGuess.kind === matchingTokenKind) {
                    return nodeAtGuess;
                }
            }
            const tokenKind = token.kind;
            let remainingMatchingTokens = 0;
            while (true) {
                const preceding = findPrecedingToken(token.getFullStart(), sourceFile);
                if (!preceding) {
                    return void 0;
                }
                token = preceding;
                if (token.kind === matchingTokenKind) {
                    if (remainingMatchingTokens === 0) {
                        return token;
                    }
                    remainingMatchingTokens--;
                }
                else if (token.kind === tokenKind) {
                    remainingMatchingTokens++;
                }
            }
        }