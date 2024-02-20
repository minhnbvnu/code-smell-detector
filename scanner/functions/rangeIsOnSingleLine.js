function rangeIsOnSingleLine(range, sourceFile) {
            return rangeStartIsOnSameLineAsRangeEnd(range, range, sourceFile);
        }