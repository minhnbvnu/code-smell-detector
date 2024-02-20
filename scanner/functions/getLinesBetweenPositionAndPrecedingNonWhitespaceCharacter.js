function getLinesBetweenPositionAndPrecedingNonWhitespaceCharacter(pos, stopPos, sourceFile, includeComments) {
            const startPos = skipTrivia(sourceFile.text, pos, 
            /*stopAfterLineBreak*/
            false, includeComments);
            const prevPos = getPreviousNonWhitespacePosition(startPos, stopPos, sourceFile);
            return getLinesBetweenPositions(sourceFile, prevPos != null ? prevPos : stopPos, startPos);
        }