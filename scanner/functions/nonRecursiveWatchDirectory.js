function nonRecursiveWatchDirectory(directoryName, callback, recursive, options) {
                Debug.assert(!recursive);
                const watchDirectoryOptions = updateOptionsForWatchDirectory(options);
                const watchDirectoryKind = Debug.checkDefined(watchDirectoryOptions.watchDirectory);
                switch (watchDirectoryKind) {
                    case 1 /* FixedPollingInterval */:
                        return pollingWatchFile(directoryName, () => callback(directoryName), 500 /* Medium */, 
                        /*options*/
                        void 0);
                    case 2 /* DynamicPriorityPolling */:
                        return ensureDynamicPollingWatchFile()(directoryName, () => callback(directoryName), 500 /* Medium */, 
                        /*options*/
                        void 0);
                    case 3 /* FixedChunkSizePolling */:
                        return ensureFixedChunkSizePollingWatchFile()(directoryName, () => callback(directoryName), 
                        /* pollingInterval */
                        void 0, 
                        /*options*/
                        void 0);
                    case 0 /* UseFsEvents */:
                        return fsWatch(directoryName, 1 /* Directory */, createFsWatchCallbackForDirectoryWatcherCallback(directoryName, callback, options, useCaseSensitiveFileNames, getCurrentDirectory), recursive, 500 /* Medium */, getFallbackOptions(watchDirectoryOptions));
                    default:
                        Debug.assertNever(watchDirectoryKind);
                }
            }