function convertPatternsToRe(patterns, options) {
        return patterns.map((pattern) => makeRe(pattern, options));
    }