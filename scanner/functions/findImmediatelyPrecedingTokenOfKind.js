function findImmediatelyPrecedingTokenOfKind(end, expectedTokenKind, sourceFile) {
            const precedingToken = findPrecedingToken(end, sourceFile);
            return precedingToken && precedingToken.kind === expectedTokenKind && end === precedingToken.getEnd() ? precedingToken : void 0;
        }