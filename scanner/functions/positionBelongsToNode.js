function positionBelongsToNode(candidate, position, sourceFile) {
            Debug.assert(candidate.pos <= position);
            return position < candidate.end || !isCompletedNode(candidate, sourceFile);
        }