function insertLeadingSemicolonIfNeeded(changeTracker, beforeNode, sourceFile) {
            const precedingToken = findPrecedingToken(beforeNode.pos, sourceFile);
            if (precedingToken && positionIsASICandidate(precedingToken.end, precedingToken.parent, sourceFile)) {
                changeTracker.insertText(sourceFile, beforeNode.getStart(sourceFile), ";");
            }
        }