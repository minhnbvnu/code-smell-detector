function createDirectoryWatcherSupportingRecursive({ watchDirectory, useCaseSensitiveFileNames, getCurrentDirectory, getAccessibleSortedChildDirectories, fileSystemEntryExists, realpath, setTimeout: setTimeout2, clearTimeout: clearTimeout2 }) {
            const cache = /* @__PURE__ */ new Map();
            const callbackCache = createMultiMap();
            const cacheToUpdateChildWatches = /* @__PURE__ */ new Map();
            let timerToUpdateChildWatches;
            const filePathComparer = getStringComparer(!useCaseSensitiveFileNames);
            const toCanonicalFilePath = createGetCanonicalFileName(useCaseSensitiveFileNames);
            return (dirName, callback, recursive, options) => recursive ? createDirectoryWatcher(dirName, options, callback) : watchDirectory(dirName, callback, recursive, options);
            function createDirectoryWatcher(dirName, options, callback) {
                const dirPath = toCanonicalFilePath(dirName);
                let directoryWatcher = cache.get(dirPath);
                if (directoryWatcher) {
                    directoryWatcher.refCount++;
                }
                else {
                    directoryWatcher = {
                        watcher: watchDirectory(dirName, (fileName) => {
                            if (isIgnoredPath(fileName, options))
                                return;
                            if (options == null ? void 0 : options.synchronousWatchDirectory) {
                                invokeCallbacks(dirPath, fileName);
                                updateChildWatches(dirName, dirPath, options);
                            }
                            else {
                                nonSyncUpdateChildWatches(dirName, dirPath, fileName, options);
                            }
                        }, 
                        /*recursive*/
                        false, options),
                        refCount: 1,
                        childWatches: emptyArray
                    };
                    cache.set(dirPath, directoryWatcher);
                    updateChildWatches(dirName, dirPath, options);
                }
                const callbackToAdd = callback && { dirName, callback };
                if (callbackToAdd) {
                    callbackCache.add(dirPath, callbackToAdd);
                }
                return {
                    dirName,
                    close: () => {
                        const directoryWatcher2 = Debug.checkDefined(cache.get(dirPath));
                        if (callbackToAdd)
                            callbackCache.remove(dirPath, callbackToAdd);
                        directoryWatcher2.refCount--;
                        if (directoryWatcher2.refCount)
                            return;
                        cache.delete(dirPath);
                        closeFileWatcherOf(directoryWatcher2);
                        directoryWatcher2.childWatches.forEach(closeFileWatcher);
                    }
                };
            }
            function invokeCallbacks(dirPath, fileNameOrInvokeMap, fileNames) {
                let fileName;
                let invokeMap;
                if (isString(fileNameOrInvokeMap)) {
                    fileName = fileNameOrInvokeMap;
                }
                else {
                    invokeMap = fileNameOrInvokeMap;
                }
                callbackCache.forEach((callbacks, rootDirName) => {
                    if (invokeMap && invokeMap.get(rootDirName) === true)
                        return;
                    if (rootDirName === dirPath || startsWith(dirPath, rootDirName) && dirPath[rootDirName.length] === directorySeparator) {
                        if (invokeMap) {
                            if (fileNames) {
                                const existing = invokeMap.get(rootDirName);
                                if (existing) {
                                    existing.push(...fileNames);
                                }
                                else {
                                    invokeMap.set(rootDirName, fileNames.slice());
                                }
                            }
                            else {
                                invokeMap.set(rootDirName, true);
                            }
                        }
                        else {
                            callbacks.forEach(({ callback }) => callback(fileName));
                        }
                    }
                });
            }
            function nonSyncUpdateChildWatches(dirName, dirPath, fileName, options) {
                const parentWatcher = cache.get(dirPath);
                if (parentWatcher && fileSystemEntryExists(dirName, 1 /* Directory */)) {
                    scheduleUpdateChildWatches(dirName, dirPath, fileName, options);
                    return;
                }
                invokeCallbacks(dirPath, fileName);
                removeChildWatches(parentWatcher);
            }
            function scheduleUpdateChildWatches(dirName, dirPath, fileName, options) {
                const existing = cacheToUpdateChildWatches.get(dirPath);
                if (existing) {
                    existing.fileNames.push(fileName);
                }
                else {
                    cacheToUpdateChildWatches.set(dirPath, { dirName, options, fileNames: [fileName] });
                }
                if (timerToUpdateChildWatches) {
                    clearTimeout2(timerToUpdateChildWatches);
                    timerToUpdateChildWatches = void 0;
                }
                timerToUpdateChildWatches = setTimeout2(onTimerToUpdateChildWatches, 1e3);
            }
            function onTimerToUpdateChildWatches() {
                timerToUpdateChildWatches = void 0;
                sysLog(`sysLog:: onTimerToUpdateChildWatches:: ${cacheToUpdateChildWatches.size}`);
                const start = timestamp();
                const invokeMap = /* @__PURE__ */ new Map();
                while (!timerToUpdateChildWatches && cacheToUpdateChildWatches.size) {
                    const result = cacheToUpdateChildWatches.entries().next();
                    Debug.assert(!result.done);
                    const { value: [dirPath, { dirName, options, fileNames }] } = result;
                    cacheToUpdateChildWatches.delete(dirPath);
                    const hasChanges = updateChildWatches(dirName, dirPath, options);
                    invokeCallbacks(dirPath, invokeMap, hasChanges ? void 0 : fileNames);
                }
                sysLog(`sysLog:: invokingWatchers:: Elapsed:: ${timestamp() - start}ms:: ${cacheToUpdateChildWatches.size}`);
                callbackCache.forEach((callbacks, rootDirName) => {
                    const existing = invokeMap.get(rootDirName);
                    if (existing) {
                        callbacks.forEach(({ callback, dirName }) => {
                            if (isArray(existing)) {
                                existing.forEach(callback);
                            }
                            else {
                                callback(dirName);
                            }
                        });
                    }
                });
                const elapsed = timestamp() - start;
                sysLog(`sysLog:: Elapsed:: ${elapsed}ms:: onTimerToUpdateChildWatches:: ${cacheToUpdateChildWatches.size} ${timerToUpdateChildWatches}`);
            }
            function removeChildWatches(parentWatcher) {
                if (!parentWatcher)
                    return;
                const existingChildWatches = parentWatcher.childWatches;
                parentWatcher.childWatches = emptyArray;
                for (const childWatcher of existingChildWatches) {
                    childWatcher.close();
                    removeChildWatches(cache.get(toCanonicalFilePath(childWatcher.dirName)));
                }
            }
            function updateChildWatches(parentDir, parentDirPath, options) {
                const parentWatcher = cache.get(parentDirPath);
                if (!parentWatcher)
                    return false;
                let newChildWatches;
                const hasChanges = enumerateInsertsAndDeletes(fileSystemEntryExists(parentDir, 1 /* Directory */) ? mapDefined(getAccessibleSortedChildDirectories(parentDir), (child) => {
                    const childFullName = getNormalizedAbsolutePath(child, parentDir);
                    return !isIgnoredPath(childFullName, options) && filePathComparer(childFullName, normalizePath(realpath(childFullName))) === 0 /* EqualTo */ ? childFullName : void 0;
                }) : emptyArray, parentWatcher.childWatches, (child, childWatcher) => filePathComparer(child, childWatcher.dirName), createAndAddChildDirectoryWatcher, closeFileWatcher, addChildDirectoryWatcher);
                parentWatcher.childWatches = newChildWatches || emptyArray;
                return hasChanges;
                function createAndAddChildDirectoryWatcher(childName) {
                    const result = createDirectoryWatcher(childName, options);
                    addChildDirectoryWatcher(result);
                }
                function addChildDirectoryWatcher(childWatcher) {
                    (newChildWatches || (newChildWatches = [])).push(childWatcher);
                }
            }
            function isIgnoredPath(path, options) {
                return some(ignoredPaths, (searchPath) => isInPath(path, searchPath)) || isIgnoredByWatchOptions(path, options, useCaseSensitiveFileNames, getCurrentDirectory);
            }
            function isInPath(path, searchPath) {
                if (stringContains(path, searchPath))
                    return true;
                if (useCaseSensitiveFileNames)
                    return false;
                return stringContains(toCanonicalFilePath(path), searchPath);
            }
        }