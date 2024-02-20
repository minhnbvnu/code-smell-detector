function getDirectoryToWatchFailedLookupLocation(failedLookupLocation, failedLookupLocationPath) {
                if (isInDirectoryPath(rootPath, failedLookupLocationPath)) {
                    failedLookupLocation = isRootedDiskPath(failedLookupLocation) ? normalizePath(failedLookupLocation) : getNormalizedAbsolutePath(failedLookupLocation, getCurrentDirectory());
                    const failedLookupPathSplit = failedLookupLocationPath.split(directorySeparator);
                    const failedLookupSplit = failedLookupLocation.split(directorySeparator);
                    Debug.assert(failedLookupSplit.length === failedLookupPathSplit.length, `FailedLookup: ${failedLookupLocation} failedLookupLocationPath: ${failedLookupLocationPath}`);
                    if (failedLookupPathSplit.length > rootSplitLength + 1) {
                        return {
                            dir: failedLookupSplit.slice(0, rootSplitLength + 1).join(directorySeparator),
                            dirPath: failedLookupPathSplit.slice(0, rootSplitLength + 1).join(directorySeparator)
                        };
                    }
                    else {
                        return {
                            dir: rootDir,
                            dirPath: rootPath,
                            nonRecursive: false
                        };
                    }
                }
                return getDirectoryToWatchFromFailedLookupLocationDirectory(getDirectoryPath(getNormalizedAbsolutePath(failedLookupLocation, getCurrentDirectory())), getDirectoryPath(failedLookupLocationPath));
            }