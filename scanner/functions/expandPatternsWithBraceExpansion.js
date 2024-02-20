function expandPatternsWithBraceExpansion(patterns) {
        return patterns.reduce((collection, pattern) => {
            return collection.concat(expandBraceExpansion(pattern));
        }, []);
    }