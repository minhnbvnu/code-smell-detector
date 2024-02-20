function watchPresentFileSystemEntryWithFsWatchFile() {
                    return watchFile2(fileOrDirectory, createFileWatcherCallback(callback), fallbackPollingInterval, fallbackOptions);
                }