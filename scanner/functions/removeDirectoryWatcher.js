function removeDirectoryWatcher(dirPath) {
                const dirWatcher = directoryWatchesOfFailedLookups.get(dirPath);
                dirWatcher.refCount--;
            }