function pathMatches(filePath, basePath, config) {
        /*
         * For both files and ignores, functions are passed the absolute
         * file path while strings are compared against the relative
         * file path.
         */
        const relativeFilePath = path.relative(basePath, filePath);
        // if files isn't an array, throw an error
        assertNonEmptyFilesArray(config);
        // match both strings and functions
        const match = pattern => {
            if (isString(pattern)) {
                return doMatch(relativeFilePath, pattern);
            }
            if (typeof pattern === 'function') {
                return pattern(filePath);
            }
            throw new TypeError(`Unexpected matcher type ${pattern}.`);
        };
        // check for all matches to config.files
        let filePathMatchesPattern = config.files.some(pattern => {
            if (Array.isArray(pattern)) {
                return pattern.every(match);
            }
            return match(pattern);
        });
        /*
         * If the file path matches the config.files patterns, then check to see
         * if there are any files to ignore.
         */
        if (filePathMatchesPattern && config.ignores) {
            filePathMatchesPattern = !shouldIgnorePath(config.ignores, filePath, relativeFilePath);
        }
        return filePathMatchesPattern;
    }