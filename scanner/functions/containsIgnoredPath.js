function containsIgnoredPath(path) {
            return some(ignoredPaths, (p) => stringContains(path, p));
        }