function setDirectoryWatcher(dir, dirPath, nonRecursive) {
                const dirWatcher = directoryWatchesOfFailedLookups.get(dirPath);
                if (dirWatcher) {
                    Debug.assert(!!nonRecursive === !!dirWatcher.nonRecursive);
                    dirWatcher.refCount++;
                }
                else {
                    directoryWatchesOfFailedLookups.set(dirPath, { watcher: createDirectoryWatcher(dir, dirPath, nonRecursive), refCount: 1, nonRecursive });
                }
            }