function patternToJson({ includes, excludes }) {
        return {
            includes: includes && includes.map(m => m.pattern),
            excludes: excludes && excludes.map(m => m.pattern)
        };
    }