function computeLineOfPosition(lineStarts, position, lowerBound) {
            let lineNumber = binarySearch(lineStarts, position, identity, compareValues, lowerBound);
            if (lineNumber < 0) {
                lineNumber = ~lineNumber - 1;
                Debug.assert(lineNumber !== -1, "position cannot precede the beginning of the file");
            }
            return lineNumber;
        }