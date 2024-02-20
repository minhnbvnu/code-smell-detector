function tryReadDirectory2(rootDir, rootDirPath) {
                rootDirPath = ensureTrailingDirectorySeparator(rootDirPath);
                const cachedResult = getCachedFileSystemEntries(rootDirPath);
                if (cachedResult) {
                    return cachedResult;
                }
                try {
                    return createCachedFileSystemEntries(rootDir, rootDirPath);
                }
                catch (_e) {
                    Debug.assert(!cachedReadDirectoryResult.has(ensureTrailingDirectorySeparator(rootDirPath)));
                    return void 0;
                }
            }