function watchFile2(fileName, callback, pollingInterval, options) {
                options = updateOptionsForWatchFile(options, useNonPollingWatchers);
                const watchFileKind = Debug.checkDefined(options.watchFile);
                switch (watchFileKind) {
                    case 0 /* FixedPollingInterval */:
                        return pollingWatchFile(fileName, callback, 250 /* Low */, 
                        /*options*/
                        void 0);
                    case 1 /* PriorityPollingInterval */:
                        return pollingWatchFile(fileName, callback, pollingInterval, 
                        /*options*/
                        void 0);
                    case 2 /* DynamicPriorityPolling */:
                        return ensureDynamicPollingWatchFile()(fileName, callback, pollingInterval, 
                        /*options*/
                        void 0);
                    case 3 /* FixedChunkSizePolling */:
                        return ensureFixedChunkSizePollingWatchFile()(fileName, callback, 
                        /* pollingInterval */
                        void 0, 
                        /*options*/
                        void 0);
                    case 4 /* UseFsEvents */:
                        return fsWatch(fileName, 0 /* File */, createFsWatchCallbackForFileWatcherCallback(fileName, callback, getModifiedTime3), 
                        /*recursive*/
                        false, pollingInterval, getFallbackOptions(options));
                    case 5 /* UseFsEventsOnParentDirectory */:
                        if (!nonPollingWatchFile) {
                            nonPollingWatchFile = createUseFsEventsOnParentDirectoryWatchFile(fsWatch, useCaseSensitiveFileNames);
                        }
                        return nonPollingWatchFile(fileName, callback, pollingInterval, getFallbackOptions(options));
                    default:
                        Debug.assertNever(watchFileKind);
                }
            }