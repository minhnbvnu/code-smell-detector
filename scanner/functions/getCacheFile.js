function getCacheFile(cacheFile, cwd) {
        /*
         * make sure the path separators are normalized for the environment/os
         * keeping the trailing path separator if present
         */
        const normalizedCacheFile = path.normalize(cacheFile);
        const resolvedCacheFile = path.resolve(cwd, normalizedCacheFile);
        const looksLikeADirectory = normalizedCacheFile.slice(-1) === path.sep;
        /**
         * return the name for the cache file in case the provided parameter is a directory
         * @returns {string} the resolved path to the cacheFile
         */
        function getCacheFileForDirectory() {
            return path.join(resolvedCacheFile, `.cache_${hash(cwd)}`);
        }
        let fileStats;
        try {
            fileStats = fs.lstatSync(resolvedCacheFile);
        }
        catch {
            fileStats = null;
        }
        /*
         * in case the file exists we need to verify if the provided path
         * is a directory or a file. If it is a directory we want to create a file
         * inside that directory
         */
        if (fileStats) {
            /*
             * is a directory or is a file, but the original file the user provided
             * looks like a directory but `path.resolve` removed the `last path.sep`
             * so we need to still treat this like a directory
             */
            if (fileStats.isDirectory() || looksLikeADirectory) {
                return getCacheFileForDirectory();
            }
            // is file so just use that file
            return resolvedCacheFile;
        }
        /*
         * here we known the file or directory doesn't exist,
         * so we will try to infer if its a directory if it looks like a directory
         * for the current operating system.
         */
        // if the last character passed is a path separator we assume is a directory
        if (looksLikeADirectory) {
            return getCacheFileForDirectory();
        }
        return resolvedCacheFile;
    }