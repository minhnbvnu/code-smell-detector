function watchDirectory(directoryName, callback, recursive, options) {
                if (fsSupportsRecursiveFsWatch) {
                    return fsWatch(directoryName, 1 /* Directory */, createFsWatchCallbackForDirectoryWatcherCallback(directoryName, callback, options, useCaseSensitiveFileNames, getCurrentDirectory), recursive, 500 /* Medium */, getFallbackOptions(options));
                }
                if (!hostRecursiveDirectoryWatcher) {
                    hostRecursiveDirectoryWatcher = createDirectoryWatcherSupportingRecursive({
                        useCaseSensitiveFileNames,
                        getCurrentDirectory,
                        fileSystemEntryExists,
                        getAccessibleSortedChildDirectories,
                        watchDirectory: nonRecursiveWatchDirectory,
                        realpath,
                        setTimeout: setTimeout2,
                        clearTimeout: clearTimeout2
                    });
                }
                return hostRecursiveDirectoryWatcher(directoryName, callback, recursive, options);
            }