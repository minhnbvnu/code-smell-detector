function createUseFsEventsOnParentDirectoryWatchFile(fsWatch, useCaseSensitiveFileNames) {
            const fileWatcherCallbacks = createMultiMap();
            const dirWatchers = /* @__PURE__ */ new Map();
            const toCanonicalName = createGetCanonicalFileName(useCaseSensitiveFileNames);
            return nonPollingWatchFile;
            function nonPollingWatchFile(fileName, callback, _pollingInterval, fallbackOptions) {
                const filePath = toCanonicalName(fileName);
                fileWatcherCallbacks.add(filePath, callback);
                const dirPath = getDirectoryPath(filePath) || ".";
                const watcher = dirWatchers.get(dirPath) || createDirectoryWatcher(getDirectoryPath(fileName) || ".", dirPath, fallbackOptions);
                watcher.referenceCount++;
                return {
                    close: () => {
                        if (watcher.referenceCount === 1) {
                            watcher.close();
                            dirWatchers.delete(dirPath);
                        }
                        else {
                            watcher.referenceCount--;
                        }
                        fileWatcherCallbacks.remove(filePath, callback);
                    }
                };
            }
            function createDirectoryWatcher(dirName, dirPath, fallbackOptions) {
                const watcher = fsWatch(dirName, 1 /* Directory */, (_eventName, relativeFileName, modifiedTime) => {
                    if (!isString(relativeFileName))
                        return;
                    const fileName = getNormalizedAbsolutePath(relativeFileName, dirName);
                    const callbacks = fileName && fileWatcherCallbacks.get(toCanonicalName(fileName));
                    if (callbacks) {
                        for (const fileCallback of callbacks) {
                            fileCallback(fileName, 1 /* Changed */, modifiedTime);
                        }
                    }
                }, 
                /*recursive*/
                false, 500 /* Medium */, fallbackOptions);
                watcher.referenceCount = 0;
                dirWatchers.set(dirPath, watcher);
                return watcher;
            }
        }