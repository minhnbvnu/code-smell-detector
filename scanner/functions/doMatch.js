function doMatch(filepath, pattern, options = {}) {
        let cache = minimatchCache;
        if (options.flipNegate) {
            cache = negatedMinimatchCache;
        }
        let matcher = cache.get(pattern);
        if (!matcher) {
            matcher = new Minimatch(pattern, Object.assign({}, MINIMATCH_OPTIONS, options));
            cache.set(pattern, matcher);
        }
        return matcher.match(filepath);
    }