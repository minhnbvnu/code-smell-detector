function getStartPositionOfRange(range, sourceFile, includeComments) {
            return positionIsSynthesized(range.pos) ? -1 : skipTrivia(sourceFile.text, range.pos, 
            /*stopAfterLineBreak*/
            false, includeComments);
        }