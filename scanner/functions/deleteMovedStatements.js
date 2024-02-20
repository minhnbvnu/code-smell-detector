function deleteMovedStatements(sourceFile, moved, changes) {
            for (const { first: first2, afterLast } of moved) {
                changes.deleteNodeRangeExcludingEnd(sourceFile, first2, afterLast);
            }
        }