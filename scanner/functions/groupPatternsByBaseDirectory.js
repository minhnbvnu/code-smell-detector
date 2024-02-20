function groupPatternsByBaseDirectory(patterns) {
        const group = {};
        return patterns.reduce((collection, pattern) => {
            const base = utils.pattern.getBaseDirectory(pattern);
            if (base in collection) {
                collection[base].push(pattern);
            }
            else {
                collection[base] = [pattern];
            }
            return collection;
        }, group);
    }