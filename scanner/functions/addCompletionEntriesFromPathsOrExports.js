function addCompletionEntriesFromPathsOrExports(result, fragment, baseDirectory, extensionOptions, host, keys, getPatternsForKey, comparePaths2) {
            let pathResults = [];
            let matchedPath;
            for (const key of keys) {
                if (key === ".")
                    continue;
                const keyWithoutLeadingDotSlash = key.replace(/^\.\//, "");
                const patterns = getPatternsForKey(key);
                if (patterns) {
                    const pathPattern = tryParsePattern(keyWithoutLeadingDotSlash);
                    if (!pathPattern)
                        continue;
                    const isMatch = typeof pathPattern === "object" && isPatternMatch(pathPattern, fragment);
                    const isLongestMatch = isMatch && (matchedPath === void 0 || comparePaths2(key, matchedPath) === -1 /* LessThan */);
                    if (isLongestMatch) {
                        matchedPath = key;
                        pathResults = pathResults.filter((r) => !r.matchedPattern);
                    }
                    if (typeof pathPattern === "string" || matchedPath === void 0 || comparePaths2(key, matchedPath) !== 1 /* GreaterThan */) {
                        pathResults.push({
                            matchedPattern: isMatch,
                            results: getCompletionsForPathMapping(keyWithoutLeadingDotSlash, patterns, fragment, baseDirectory, extensionOptions, host).map(({ name, kind, extension }) => nameAndKind(name, kind, extension))
                        });
                    }
                }
            }
            pathResults.forEach((pathResult) => pathResult.results.forEach((r) => result.add(r)));
            return matchedPath !== void 0;
        }