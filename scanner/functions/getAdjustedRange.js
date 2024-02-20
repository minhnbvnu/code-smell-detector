function getAdjustedRange(sourceFile, startNode2, endNode2, options) {
            return { pos: getAdjustedStartPosition(sourceFile, startNode2, options), end: getAdjustedEndPosition(sourceFile, endNode2, options) };
        }