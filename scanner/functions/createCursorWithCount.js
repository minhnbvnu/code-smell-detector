function createCursorWithCount(factory, tokens, comments, indexMap, startLoc, endLoc, opts) {
        let includeComments = false;
        let count = 0;
        let countExists = false;
        let filter = null;
        if (typeof opts === "number") {
            count = opts | 0;
            countExists = true;
        }
        else if (typeof opts === "function") {
            filter = opts;
        }
        else if (opts) {
            includeComments = !!opts.includeComments;
            count = opts.count | 0;
            countExists = typeof opts.count === "number";
            filter = opts.filter || null;
        }
        assert(count >= 0, "options.count should be zero or a positive integer.");
        assert(!filter || typeof filter === "function", "options.filter should be a function.");
        return factory.createCursor(tokens, comments, indexMap, startLoc, endLoc, includeComments, filter, 0, countExists ? count : -1);
    }