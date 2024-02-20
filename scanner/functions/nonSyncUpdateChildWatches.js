function nonSyncUpdateChildWatches(dirName, dirPath, fileName, options) {
                const parentWatcher = cache.get(dirPath);
                if (parentWatcher && fileSystemEntryExists(dirName, 1 /* Directory */)) {
                    scheduleUpdateChildWatches(dirName, dirPath, fileName, options);
                    return;
                }
                invokeCallbacks(dirPath, fileName);
                removeChildWatches(parentWatcher);
            }