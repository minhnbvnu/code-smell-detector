function createCursorWithPadding(tokens, comments, indexMap, startLoc, endLoc, beforeCount, afterCount) {
        if (typeof beforeCount === "undefined" && typeof afterCount === "undefined") {
            return new ForwardTokenCursor(tokens, comments, indexMap, startLoc, endLoc);
        }
        if (typeof beforeCount === "number" || typeof beforeCount === "undefined") {
            return new PaddedTokenCursor(tokens, comments, indexMap, startLoc, endLoc, beforeCount | 0, afterCount | 0);
        }
        return createCursorWithCount(cursors.forward, tokens, comments, indexMap, startLoc, endLoc, beforeCount);
    }