function getLinesBetweenRangeEndAndRangeStart(range1, range2, sourceFile, includeSecondRangeComments) {
            const range2Start = getStartPositionOfRange(range2, sourceFile, includeSecondRangeComments);
            return getLinesBetweenPositions(sourceFile, range1.end, range2Start);
        }