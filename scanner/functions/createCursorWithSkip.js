function createCursorWithSkip(factory, tokens, comments, indexMap, startLoc, endLoc, opts) {
        let includeComments = false;
        let skip = 0;
        let filter = null;
        if (typeof opts === "number") {
            skip = opts | 0;
        }
        else if (typeof opts === "function") {
            filter = opts;
        }
        else if (opts) {
            includeComments = !!opts.includeComments;
            skip = opts.skip | 0;
            filter = opts.filter || null;
        }
        assert(skip >= 0, "options.skip should be zero or a positive integer.");
        assert(!filter || typeof filter === "function", "options.filter should be a function.");
        return factory.createCursor(tokens, comments, indexMap, startLoc, endLoc, includeComments, filter, skip, -1);
    }