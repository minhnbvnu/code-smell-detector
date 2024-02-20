function getLinesBetweenRangeEndPositions(range1, range2, sourceFile) {
            return getLinesBetweenPositions(sourceFile, range1.end, range2.end);
        }