function markReturnStatementsOnCurrentSegmentsAsUsed() {
                scopeInfo
                    .codePath
                    .currentSegments
                    .forEach(markReturnStatementsOnSegmentAsUsed);
            }