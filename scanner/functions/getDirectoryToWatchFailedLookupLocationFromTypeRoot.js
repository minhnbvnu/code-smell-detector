function getDirectoryToWatchFailedLookupLocationFromTypeRoot(typeRoot, typeRootPath) {
                if (isInDirectoryPath(rootPath, typeRootPath)) {
                    return rootPath;
                }
                const toWatch = getDirectoryToWatchFromFailedLookupLocationDirectory(typeRoot, typeRootPath);
                return toWatch && directoryWatchesOfFailedLookups.has(toWatch.dirPath) ? toWatch.dirPath : void 0;
            }