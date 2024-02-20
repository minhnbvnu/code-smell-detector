async function globSearch({ basePath, patterns, rawPatterns, configs, errorOnUnmatchedPattern }) {
        if (patterns.length === 0) {
            return [];
        }
        /*
         * In this section we are converting the patterns into Minimatch
         * instances for performance reasons. Because we are doing the same
         * matches repeatedly, it's best to compile those patterns once and
         * reuse them multiple times.
         *
         * To do that, we convert any patterns with an absolute path into a
         * relative path and normalize it to Posix-style slashes. We also keep
         * track of the relative patterns to map them back to the original
         * patterns, which we need in order to throw an error if there are any
         * unmatched patterns.
         */
        const relativeToPatterns = new Map();
        const matchers = patterns.map((pattern, i) => {
            const patternToUse = path.isAbsolute(pattern)
                ? normalizeToPosix(path.relative(basePath, pattern))
                : pattern;
            relativeToPatterns.set(patternToUse, patterns[i]);
            return new Minimatch(patternToUse, MINIMATCH_OPTIONS);
        });
        /*
         * We track unmatched patterns because we may want to throw an error when
         * they occur. To start, this set is initialized with all of the patterns.
         * Every time a match occurs, the pattern is removed from the set, making
         * it easy to tell if we have any unmatched patterns left at the end of
         * search.
         */
        const unmatchedPatterns = new Set([...relativeToPatterns.keys()]);
        const filePaths = (await doFsWalk(basePath, {
            deepFilter(entry) {
                const relativePath = normalizeToPosix(path.relative(basePath, entry.path));
                const matchesPattern = matchers.some(matcher => matcher.match(relativePath, true));
                return matchesPattern && !configs.isDirectoryIgnored(entry.path);
            },
            entryFilter(entry) {
                const relativePath = normalizeToPosix(path.relative(basePath, entry.path));
                // entries may be directories or files so filter out directories
                if (entry.dirent.isDirectory()) {
                    return false;
                }
                /*
                 * Optimization: We need to track when patterns are left unmatched
                 * and so we use `unmatchedPatterns` to do that. There is a bit of
                 * complexity here because the same file can be matched by more than
                 * one pattern. So, when we start, we actually need to test every
                 * pattern against every file. Once we know there are no remaining
                 * unmatched patterns, then we can switch to just looking for the
                 * first matching pattern for improved speed.
                 */
                const matchesPattern = unmatchedPatterns.size > 0
                    ? matchers.reduce((previousValue, matcher) => {
                        const pathMatches = matcher.match(relativePath);
                        /*
                         * We updated the unmatched patterns set only if the path
                         * matches and the file isn't ignored. If the file is
                         * ignored, that means there wasn't a match for the
                         * pattern so it should not be removed.
                         *
                         * Performance note: isFileIgnored() aggressively caches
                         * results so there is no performance penalty for calling
                         * it twice with the same argument.
                         */
                        if (pathMatches && !configs.isFileIgnored(entry.path)) {
                            unmatchedPatterns.delete(matcher.pattern);
                        }
                        return pathMatches || previousValue;
                    }, false)
                    : matchers.some(matcher => matcher.match(relativePath));
                return matchesPattern && !configs.isFileIgnored(entry.path);
            }
        })).map(entry => entry.path);
        // now check to see if we have any unmatched patterns
        if (errorOnUnmatchedPattern && unmatchedPatterns.size > 0) {
            throw new UnmatchedSearchPatternsError({
                basePath,
                unmatchedPatterns: [...unmatchedPatterns].map(pattern => relativeToPatterns.get(pattern)),
                patterns,
                rawPatterns
            });
        }
        return filePaths;
    }