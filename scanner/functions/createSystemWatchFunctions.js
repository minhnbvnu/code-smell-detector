function createSystemWatchFunctions({ pollingWatchFileWorker, getModifiedTime: getModifiedTime3, setTimeout: setTimeout2, clearTimeout: clearTimeout2, fsWatchWorker, fileSystemEntryExists, useCaseSensitiveFileNames, getCurrentDirectory, fsSupportsRecursiveFsWatch, getAccessibleSortedChildDirectories, realpath, tscWatchFile, useNonPollingWatchers, tscWatchDirectory, inodeWatching, sysLog: sysLog2 }) {
            const pollingWatches = /* @__PURE__ */ new Map();
            const fsWatches = /* @__PURE__ */ new Map();
            const fsWatchesRecursive = /* @__PURE__ */ new Map();
            let dynamicPollingWatchFile;
            let fixedChunkSizePollingWatchFile;
            let nonPollingWatchFile;
            let hostRecursiveDirectoryWatcher;
            let hitSystemWatcherLimit = false;
            return {
                watchFile: watchFile2,
                watchDirectory
            };
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
            function ensureDynamicPollingWatchFile() {
                return dynamicPollingWatchFile || (dynamicPollingWatchFile = createDynamicPriorityPollingWatchFile({ getModifiedTime: getModifiedTime3, setTimeout: setTimeout2 }));
            }
            function ensureFixedChunkSizePollingWatchFile() {
                return fixedChunkSizePollingWatchFile || (fixedChunkSizePollingWatchFile = createFixedChunkSizePollingWatchFile({ getModifiedTime: getModifiedTime3, setTimeout: setTimeout2 }));
            }
            function updateOptionsForWatchFile(options, useNonPollingWatchers2) {
                if (options && options.watchFile !== void 0)
                    return options;
                switch (tscWatchFile) {
                    case "PriorityPollingInterval":
                        return { watchFile: 1 /* PriorityPollingInterval */ };
                    case "DynamicPriorityPolling":
                        return { watchFile: 2 /* DynamicPriorityPolling */ };
                    case "UseFsEvents":
                        return generateWatchFileOptions(4 /* UseFsEvents */, 1 /* PriorityInterval */, options);
                    case "UseFsEventsWithFallbackDynamicPolling":
                        return generateWatchFileOptions(4 /* UseFsEvents */, 2 /* DynamicPriority */, options);
                    case "UseFsEventsOnParentDirectory":
                        useNonPollingWatchers2 = true;
                    default:
                        return useNonPollingWatchers2 ? (
                        // Use notifications from FS to watch with falling back to fs.watchFile
                        generateWatchFileOptions(5 /* UseFsEventsOnParentDirectory */, 1 /* PriorityInterval */, options)) : (
                        // Default to using fs events
                        { watchFile: 4 /* UseFsEvents */ });
                }
            }
            function generateWatchFileOptions(watchFile3, fallbackPolling, options) {
                const defaultFallbackPolling = options == null ? void 0 : options.fallbackPolling;
                return {
                    watchFile: watchFile3,
                    fallbackPolling: defaultFallbackPolling === void 0 ? fallbackPolling : defaultFallbackPolling
                };
            }
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
            function updateOptionsForWatchDirectory(options) {
                if (options && options.watchDirectory !== void 0)
                    return options;
                switch (tscWatchDirectory) {
                    case "RecursiveDirectoryUsingFsWatchFile":
                        return { watchDirectory: 1 /* FixedPollingInterval */ };
                    case "RecursiveDirectoryUsingDynamicPriorityPolling":
                        return { watchDirectory: 2 /* DynamicPriorityPolling */ };
                    default:
                        const defaultFallbackPolling = options == null ? void 0 : options.fallbackPolling;
                        return {
                            watchDirectory: 0 /* UseFsEvents */,
                            fallbackPolling: defaultFallbackPolling !== void 0 ? defaultFallbackPolling : void 0
                        };
                }
            }
            function pollingWatchFile(fileName, callback, pollingInterval, options) {
                return createSingleWatcherPerName(pollingWatches, useCaseSensitiveFileNames, fileName, callback, (cb) => pollingWatchFileWorker(fileName, cb, pollingInterval, options));
            }
            function fsWatch(fileOrDirectory, entryKind, callback, recursive, fallbackPollingInterval, fallbackOptions) {
                return createSingleWatcherPerName(recursive ? fsWatchesRecursive : fsWatches, useCaseSensitiveFileNames, fileOrDirectory, callback, (cb) => fsWatchHandlingExistenceOnHost(fileOrDirectory, entryKind, cb, recursive, fallbackPollingInterval, fallbackOptions));
            }
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
        }