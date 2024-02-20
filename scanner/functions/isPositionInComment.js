function isPositionInComment(sourceFile, pos, parent) {
        return getCommentAtPosition(sourceFile, pos, parent) !== undefined;
    }