function shouldIgnorePath(ignores, filePath, relativeFilePath) {
        // all files outside of the basePath are ignored
        if (relativeFilePath.startsWith('..')) {
            return true;
        }
        return ignores.reduce((ignored, matcher) => {
            if (!ignored) {
                if (typeof matcher === 'function') {
                    return matcher(filePath);
                }
                // don't check negated patterns because we're not ignored yet
                if (!matcher.startsWith('!')) {
                    return doMatch(relativeFilePath, matcher);
                }
                // otherwise we're still not ignored
                return false;
            }
            // only need to check negated patterns because we're ignored
            if (typeof matcher === 'string' && matcher.startsWith('!')) {
                return !doMatch(relativeFilePath, matcher, {
                    flipNegate: true
                });
            }
            return ignored;
        }, false);
    }