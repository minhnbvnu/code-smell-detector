function rangeEndPositionsAreOnSameLine(range1, range2, sourceFile) {
            return positionsAreOnSameLine(range1.end, range2.end, sourceFile);
        }