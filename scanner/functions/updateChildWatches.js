function updateChildWatches(parentDir, parentDirPath, options) {
                const parentWatcher = cache.get(parentDirPath);
                if (!parentWatcher)
                    return false;
                let newChildWatches;
                const hasChanges = enumerateInsertsAndDeletes(fileSystemEntryExists(parentDir, 1 /* Directory */) ? mapDefined(getAccessibleSortedChildDirectories(parentDir), (child) => {
                    const childFullName = getNormalizedAbsolutePath(child, parentDir);
                    return !isIgnoredPath(childFullName, options) && filePathComparer(childFullName, normalizePath(realpath(childFullName))) === 0 /* EqualTo */ ? childFullName : void 0;
                }) : emptyArray, parentWatcher.childWatches, (child, childWatcher) => filePathComparer(child, childWatcher.dirName), createAndAddChildDirectoryWatcher, closeFileWatcher, addChildDirectoryWatcher);
                parentWatcher.childWatches = newChildWatches || emptyArray;
                return hasChanges;
                function createAndAddChildDirectoryWatcher(childName) {
                    const result = createDirectoryWatcher(childName, options);
                    addChildDirectoryWatcher(result);
                }
                function addChildDirectoryWatcher(childWatcher) {
                    (newChildWatches || (newChildWatches = [])).push(childWatcher);
                }
            }