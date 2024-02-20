function addCompletionEntriesFromPaths(result, fragment, baseDirectory, extensionOptions, host, paths) {
            const getPatternsForKey = (key) => paths[key];
            const comparePaths2 = (a, b) => {
                const patternA = tryParsePattern(a);
                const patternB = tryParsePattern(b);
                const lengthA = typeof patternA === "object" ? patternA.prefix.length : a.length;
                const lengthB = typeof patternB === "object" ? patternB.prefix.length : b.length;
                return compareValues(lengthB, lengthA);
            };
            return addCompletionEntriesFromPathsOrExports(result, fragment, baseDirectory, extensionOptions, host, getOwnKeys(paths), getPatternsForKey, comparePaths2);
        }