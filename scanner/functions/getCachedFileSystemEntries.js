function getCachedFileSystemEntries(rootDirPath) {
                return cachedReadDirectoryResult.get(ensureTrailingDirectorySeparator(rootDirPath));
            }