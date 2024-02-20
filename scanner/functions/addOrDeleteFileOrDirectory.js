function addOrDeleteFileOrDirectory(fileOrDirectory, fileOrDirectoryPath) {
                const existingResult = getCachedFileSystemEntries(fileOrDirectoryPath);
                if (existingResult !== void 0) {
                    clearCache();
                    return void 0;
                }
                const parentResult = getCachedFileSystemEntriesForBaseDir(fileOrDirectoryPath);
                if (!parentResult) {
                    return void 0;
                }
                if (!host.directoryExists) {
                    clearCache();
                    return void 0;
                }
                const baseName = getBaseNameOfFileName(fileOrDirectory);
                const fsQueryResult = {
                    fileExists: host.fileExists(fileOrDirectoryPath),
                    directoryExists: host.directoryExists(fileOrDirectoryPath)
                };
                if (fsQueryResult.directoryExists || hasEntry(parentResult.sortedAndCanonicalizedDirectories, getCanonicalFileName(baseName))) {
                    clearCache();
                }
                else {
                    updateFilesOfFileSystemEntry(parentResult, baseName, fsQueryResult.fileExists);
                }
                return fsQueryResult;
            }