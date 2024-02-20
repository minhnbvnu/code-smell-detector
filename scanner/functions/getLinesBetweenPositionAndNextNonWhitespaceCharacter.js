function getLinesBetweenPositionAndNextNonWhitespaceCharacter(pos, stopPos, sourceFile, includeComments) {
            const nextPos = skipTrivia(sourceFile.text, pos, 
            /*stopAfterLineBreak*/
            false, includeComments);
            return getLinesBetweenPositions(sourceFile, pos, Math.min(stopPos, nextPos));
        }