function createDirectoryWatcher(directory, dirPath, nonRecursive) {
                return resolutionHost.watchDirectoryOfFailedLookupLocation(directory, (fileOrDirectory) => {
                    const fileOrDirectoryPath = resolutionHost.toPath(fileOrDirectory);
                    if (cachedDirectoryStructureHost) {
                        cachedDirectoryStructureHost.addOrDeleteFileOrDirectory(fileOrDirectory, fileOrDirectoryPath);
                    }
                    scheduleInvalidateResolutionOfFailedLookupLocation(fileOrDirectoryPath, dirPath === fileOrDirectoryPath);
                }, nonRecursive ? 0 /* None */ : 1 /* Recursive */);
            }