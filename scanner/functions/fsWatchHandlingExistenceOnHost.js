function fsWatchHandlingExistenceOnHost(fileOrDirectory, entryKind, callback, recursive, fallbackPollingInterval, fallbackOptions) {
                let lastDirectoryPartWithDirectorySeparator;
                let lastDirectoryPart;
                if (inodeWatching) {
                    lastDirectoryPartWithDirectorySeparator = fileOrDirectory.substring(fileOrDirectory.lastIndexOf(directorySeparator));
                    lastDirectoryPart = lastDirectoryPartWithDirectorySeparator.slice(directorySeparator.length);
                }
                let watcher = !fileSystemEntryExists(fileOrDirectory, entryKind) ? watchMissingFileSystemEntry() : watchPresentFileSystemEntry();
                return {
                    close: () => {
                        if (watcher) {
                            watcher.close();
                            watcher = void 0;
                        }
                    }
                };
                function updateWatcher(createWatcher) {
                    if (watcher) {
                        sysLog2(`sysLog:: ${fileOrDirectory}:: Changing watcher to ${createWatcher === watchPresentFileSystemEntry ? "Present" : "Missing"}FileSystemEntryWatcher`);
                        watcher.close();
                        watcher = createWatcher();
                    }
                }
                function watchPresentFileSystemEntry() {
                    if (hitSystemWatcherLimit) {
                        sysLog2(`sysLog:: ${fileOrDirectory}:: Defaulting to watchFile`);
                        return watchPresentFileSystemEntryWithFsWatchFile();
                    }
                    try {
                        const presentWatcher = fsWatchWorker(fileOrDirectory, recursive, inodeWatching ? callbackChangingToMissingFileSystemEntry : callback);
                        presentWatcher.on("error", () => {
                            callback("rename", "");
                            updateWatcher(watchMissingFileSystemEntry);
                        });
                        return presentWatcher;
                    }
                    catch (e) {
                        hitSystemWatcherLimit || (hitSystemWatcherLimit = e.code === "ENOSPC");
                        sysLog2(`sysLog:: ${fileOrDirectory}:: Changing to watchFile`);
                        return watchPresentFileSystemEntryWithFsWatchFile();
                    }
                }
                function callbackChangingToMissingFileSystemEntry(event, relativeName) {
                    let originalRelativeName;
                    if (relativeName && endsWith(relativeName, "~")) {
                        originalRelativeName = relativeName;
                        relativeName = relativeName.slice(0, relativeName.length - 1);
                    }
                    if (event === "rename" && (!relativeName || relativeName === lastDirectoryPart || endsWith(relativeName, lastDirectoryPartWithDirectorySeparator))) {
                        const modifiedTime = getModifiedTime3(fileOrDirectory) || missingFileModifiedTime;
                        if (originalRelativeName)
                            callback(event, originalRelativeName, modifiedTime);
                        callback(event, relativeName, modifiedTime);
                        if (inodeWatching) {
                            updateWatcher(modifiedTime === missingFileModifiedTime ? watchMissingFileSystemEntry : watchPresentFileSystemEntry);
                        }
                        else if (modifiedTime === missingFileModifiedTime) {
                            updateWatcher(watchMissingFileSystemEntry);
                        }
                    }
                    else {
                        if (originalRelativeName)
                            callback(event, originalRelativeName);
                        callback(event, relativeName);
                    }
                }
                function watchPresentFileSystemEntryWithFsWatchFile() {
                    return watchFile2(fileOrDirectory, createFileWatcherCallback(callback), fallbackPollingInterval, fallbackOptions);
                }
                function watchMissingFileSystemEntry() {
                    return watchFile2(fileOrDirectory, (_fileName, eventKind, modifiedTime) => {
                        if (eventKind === 0 /* Created */) {
                            modifiedTime || (modifiedTime = getModifiedTime3(fileOrDirectory) || missingFileModifiedTime);
                            if (modifiedTime !== missingFileModifiedTime) {
                                callback("rename", "", modifiedTime);
                                updateWatcher(watchPresentFileSystemEntry);
                            }
                        }
                    }, fallbackPollingInterval, fallbackOptions);
                }
            }