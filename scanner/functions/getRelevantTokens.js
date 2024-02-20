function getRelevantTokens(position, sourceFile) {
            const previousToken = findPrecedingToken(position, sourceFile);
            if (previousToken && position <= previousToken.end && (isMemberName(previousToken) || isKeyword(previousToken.kind))) {
                const contextToken = findPrecedingToken(previousToken.getFullStart(), sourceFile, 
                /*startNode*/
                void 0);
                return { contextToken, previousToken };
            }
            return { contextToken: previousToken, previousToken };
        }