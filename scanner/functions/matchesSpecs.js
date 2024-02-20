function matchesSpecs(path, includeSpecs, excludeSpecs, host) {
            if (!includeSpecs)
                return returnTrue;
            const patterns = getFileMatcherPatterns(path, excludeSpecs, includeSpecs, host.useCaseSensitiveFileNames, host.getCurrentDirectory());
            const excludeRe = patterns.excludePattern && getRegexFromPattern(patterns.excludePattern, host.useCaseSensitiveFileNames);
            const includeRe = patterns.includeFilePattern && getRegexFromPattern(patterns.includeFilePattern, host.useCaseSensitiveFileNames);
            if (includeRe) {
                if (excludeRe) {
                    return (path2) => !(includeRe.test(path2) && !excludeRe.test(path2));
                }
                return (path2) => !includeRe.test(path2);
            }
            if (excludeRe) {
                return (path2) => excludeRe.test(path2);
            }
            return returnTrue;
        }