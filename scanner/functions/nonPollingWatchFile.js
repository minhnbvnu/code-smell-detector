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