function isIgnoredPath(path, options) {
                return some(ignoredPaths, (searchPath) => isInPath(path, searchPath)) || isIgnoredByWatchOptions(path, options, useCaseSensitiveFileNames, getCurrentDirectory);
            }