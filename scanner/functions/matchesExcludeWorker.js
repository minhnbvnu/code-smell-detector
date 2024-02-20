function matchesExcludeWorker(pathToCheck, excludeSpecs, useCaseSensitiveFileNames, currentDirectory, basePath) {
            const excludePattern = getRegularExpressionForWildcard(excludeSpecs, combinePaths(normalizePath(currentDirectory), basePath), "exclude");
            const excludeRegex = excludePattern && getRegexFromPattern(excludePattern, useCaseSensitiveFileNames);
            if (!excludeRegex)
                return false;
            if (excludeRegex.test(pathToCheck))
                return true;
            return !hasExtension(pathToCheck) && excludeRegex.test(ensureTrailingDirectorySeparator(pathToCheck));
        }