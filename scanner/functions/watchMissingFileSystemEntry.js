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