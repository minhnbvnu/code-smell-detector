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