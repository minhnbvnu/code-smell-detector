async function globMultiSearch({ searches, configs, errorOnUnmatchedPattern }) {
        /*
         * For convenience, we normalized the search map into an array of objects.
         * Next, we filter out all searches that have no patterns. This happens
         * primarily for the cwd, which is prepopulated in the searches map as an
         * optimization. However, if it has no patterns, it means all patterns
         * occur outside of the cwd and we can safely filter out that search.
         */
        const normalizedSearches = [...searches].map(([basePath, { patterns, rawPatterns }]) => ({ basePath, patterns, rawPatterns })).filter(({ patterns }) => patterns.length > 0);
        const results = await Promise.allSettled(normalizedSearches.map(({ basePath, patterns, rawPatterns }) => globSearch({
            basePath,
            patterns,
            rawPatterns,
            configs,
            errorOnUnmatchedPattern
        })));
        const filePaths = [];
        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            const currentSearch = normalizedSearches[i];
            if (result.status === "fulfilled") {
                // if the search was successful just add the results
                if (result.value.length > 0) {
                    filePaths.push(...result.value);
                }
                continue;
            }
            // if we make it here then there was an error
            const error = result.reason;
            // unexpected errors should be re-thrown
            if (!error.basePath) {
                throw error;
            }
            if (errorOnUnmatchedPattern) {
                await throwErrorForUnmatchedPatterns({
                    ...currentSearch,
                    unmatchedPatterns: error.unmatchedPatterns
                });
            }
        }
        return [...new Set(filePaths)];
    }