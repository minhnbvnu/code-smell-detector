function positionsAreOnSameLine(pos1, pos2, sourceFile) {
            return getLinesBetweenPositions(sourceFile, pos1, pos2) === 0;
        }