function createRegExpForIgnorePatterns(normalizedOptions) {
        Object.keys(normalizedOptions).forEach(key => {
            const ignorePatternStr = normalizedOptions[key].ignorePattern;
            if (ignorePatternStr) {
                const regExp = RegExp(`^\\s*(?:${ignorePatternStr})`, "u");
                normalizedOptions[key].ignorePatternRegExp = regExp;
            }
        });
    }