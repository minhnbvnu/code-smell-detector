function findFirstNonJsxWhitespaceToken(sourceFile, position) {
            let tokenAtPosition = getTokenAtPosition(sourceFile, position);
            while (isWhiteSpaceOnlyJsxText(tokenAtPosition)) {
                const nextToken = findNextToken(tokenAtPosition, tokenAtPosition.parent, sourceFile);
                if (!nextToken)
                    return;
                tokenAtPosition = nextToken;
            }
            return tokenAtPosition;
        }