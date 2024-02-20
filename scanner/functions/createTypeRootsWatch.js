function createTypeRootsWatch(typeRootPath, typeRoot) {
                return resolutionHost.watchTypeRootsDirectory(typeRoot, (fileOrDirectory) => {
                    const fileOrDirectoryPath = resolutionHost.toPath(fileOrDirectory);
                    if (cachedDirectoryStructureHost) {
                        cachedDirectoryStructureHost.addOrDeleteFileOrDirectory(fileOrDirectory, fileOrDirectoryPath);
                    }
                    hasChangedAutomaticTypeDirectiveNames = true;
                    resolutionHost.onChangedAutomaticTypeDirectiveNames();
                    const dirPath = getDirectoryToWatchFailedLookupLocationFromTypeRoot(typeRoot, typeRootPath);
                    if (dirPath) {
                        scheduleInvalidateResolutionOfFailedLookupLocation(fileOrDirectoryPath, dirPath === fileOrDirectoryPath);
                    }
                }, 1 /* Recursive */);
            }