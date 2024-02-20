function processRange(range, rangeStart, parent2, contextNode, dynamicIndentation) {
                const rangeHasError = rangeContainsError(range);
                let lineAction = 0 /* None */;
                if (!rangeHasError) {
                    if (!previousRange) {
                        const originalStart = sourceFile.getLineAndCharacterOfPosition(originalRange.pos);
                        trimTrailingWhitespacesForLines(originalStart.line, rangeStart.line);
                    }
                    else {
                        lineAction = processPair(range, rangeStart.line, parent2, previousRange, previousRangeStartLine, previousParent, contextNode, dynamicIndentation);
                    }
                }
                previousRange = range;
                previousRangeTriviaEnd = range.end;
                previousParent = parent2;
                previousRangeStartLine = rangeStart.line;
                return lineAction;
            }