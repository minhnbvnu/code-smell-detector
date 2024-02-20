function fsWatch(fileOrDirectory, entryKind, callback, recursive, fallbackPollingInterval, fallbackOptions) {
                return createSingleWatcherPerName(recursive ? fsWatchesRecursive : fsWatches, useCaseSensitiveFileNames, fileOrDirectory, callback, (cb) => fsWatchHandlingExistenceOnHost(fileOrDirectory, entryKind, cb, recursive, fallbackPollingInterval, fallbackOptions));
            }