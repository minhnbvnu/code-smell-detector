function rangeStartIsOnSameLineAsRangeEnd(range1, range2, sourceFile) {
            return positionsAreOnSameLine(getStartPositionOfRange(range1, sourceFile, 
            /*includeComments*/
            false), range2.end, sourceFile);
        }