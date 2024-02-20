function rangeStartPositionsAreOnSameLine(range1, range2, sourceFile) {
            return positionsAreOnSameLine(getStartPositionOfRange(range1, sourceFile, 
            /*includeComments*/
            false), getStartPositionOfRange(range2, sourceFile, 
            /*includeComments*/
            false), sourceFile);
        }