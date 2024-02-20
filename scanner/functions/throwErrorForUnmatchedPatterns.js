async function throwErrorForUnmatchedPatterns({ basePath, patterns, rawPatterns, unmatchedPatterns }) {
        const pattern = unmatchedPatterns[0];
        const rawPattern = rawPatterns[patterns.indexOf(pattern)];
        const patternHasMatch = await globMatch({
            basePath,
            pattern
        });
        if (patternHasMatch) {
            throw new AllFilesIgnoredError(rawPattern);
        }
        // if we get here there are truly no matches
        throw new NoFilesFoundError(rawPattern, true);
    }