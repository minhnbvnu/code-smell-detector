function getNextLine() {
                    return remainingLinesIndex < remainingLines.length ?
                        remainingLines[remainingLinesIndex++] : undefined;
                }