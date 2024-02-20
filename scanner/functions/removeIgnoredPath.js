function removeIgnoredPath(path) {
            if (endsWith(path, "/node_modules/.staging")) {
                return removeSuffix(path, "/.staging");
            }
            return some(ignoredPaths, (searchPath) => stringContains(path, searchPath)) ? void 0 : path;
        }