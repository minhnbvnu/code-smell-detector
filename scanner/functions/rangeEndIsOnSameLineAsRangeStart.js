function rangeEndIsOnSameLineAsRangeStart(range1, range2, sourceFile) {
            return positionsAreOnSameLine(range1.end, getStartPositionOfRange(range2, sourceFile, 
            /*includeComments*/
            false), sourceFile);
        }