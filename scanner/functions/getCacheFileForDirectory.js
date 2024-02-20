function getCacheFileForDirectory() {
            return path.join(resolvedCacheFile, `.cache_${hash(cwd)}`);
        }