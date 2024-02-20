function getWatchFactory(host, watchLogLevel, log, getDetailWatchInfo) {
            setSysLog(watchLogLevel === 2 /* Verbose */ ? log : noop);
            const plainInvokeFactory = {
                watchFile: (file, callback, pollingInterval, options) => host.watchFile(file, callback, pollingInterval, options),
                watchDirectory: (directory, callback, flags, options) => host.watchDirectory(directory, callback, (flags & 1 /* Recursive */) !== 0, options)
            };
            const triggerInvokingFactory = watchLogLevel !== 0 /* None */ ? {
                watchFile: createTriggerLoggingAddWatch("watchFile"),
                watchDirectory: createTriggerLoggingAddWatch("watchDirectory")
            } : void 0;
            const factory2 = watchLogLevel === 2 /* Verbose */ ? {
                watchFile: createFileWatcherWithLogging,
                watchDirectory: createDirectoryWatcherWithLogging
            } : triggerInvokingFactory || plainInvokeFactory;
            const excludeWatcherFactory = watchLogLevel === 2 /* Verbose */ ? createExcludeWatcherWithLogging : returnNoopFileWatcher;
            return {
                watchFile: createExcludeHandlingAddWatch("watchFile"),
                watchDirectory: createExcludeHandlingAddWatch("watchDirectory")
            };
            function createExcludeHandlingAddWatch(key) {
                return (file, cb, flags, options, detailInfo1, detailInfo2) => {
                    var _a2;
                    return !matchesExclude(file, key === "watchFile" ? options == null ? void 0 : options.excludeFiles : options == null ? void 0 : options.excludeDirectories, useCaseSensitiveFileNames(), ((_a2 = host.getCurrentDirectory) == null ? void 0 : _a2.call(host)) || "") ? factory2[key].call(
                    /*thisArgs*/
                    void 0, file, cb, flags, options, detailInfo1, detailInfo2) : excludeWatcherFactory(file, flags, options, detailInfo1, detailInfo2);
                };
            }
            function useCaseSensitiveFileNames() {
                return typeof host.useCaseSensitiveFileNames === "boolean" ? host.useCaseSensitiveFileNames : host.useCaseSensitiveFileNames();
            }
            function createExcludeWatcherWithLogging(file, flags, options, detailInfo1, detailInfo2) {
                log(`ExcludeWatcher:: Added:: ${getWatchInfo(file, flags, options, detailInfo1, detailInfo2, getDetailWatchInfo)}`);
                return {
                    close: () => log(`ExcludeWatcher:: Close:: ${getWatchInfo(file, flags, options, detailInfo1, detailInfo2, getDetailWatchInfo)}`)
                };
            }
            function createFileWatcherWithLogging(file, cb, flags, options, detailInfo1, detailInfo2) {
                log(`FileWatcher:: Added:: ${getWatchInfo(file, flags, options, detailInfo1, detailInfo2, getDetailWatchInfo)}`);
                const watcher = triggerInvokingFactory.watchFile(file, cb, flags, options, detailInfo1, detailInfo2);
                return {
                    close: () => {
                        log(`FileWatcher:: Close:: ${getWatchInfo(file, flags, options, detailInfo1, detailInfo2, getDetailWatchInfo)}`);
                        watcher.close();
                    }
                };
            }
            function createDirectoryWatcherWithLogging(file, cb, flags, options, detailInfo1, detailInfo2) {
                const watchInfo = `DirectoryWatcher:: Added:: ${getWatchInfo(file, flags, options, detailInfo1, detailInfo2, getDetailWatchInfo)}`;
                log(watchInfo);
                const start = timestamp();
                const watcher = triggerInvokingFactory.watchDirectory(file, cb, flags, options, detailInfo1, detailInfo2);
                const elapsed = timestamp() - start;
                log(`Elapsed:: ${elapsed}ms ${watchInfo}`);
                return {
                    close: () => {
                        const watchInfo2 = `DirectoryWatcher:: Close:: ${getWatchInfo(file, flags, options, detailInfo1, detailInfo2, getDetailWatchInfo)}`;
                        log(watchInfo2);
                        const start2 = timestamp();
                        watcher.close();
                        const elapsed2 = timestamp() - start2;
                        log(`Elapsed:: ${elapsed2}ms ${watchInfo2}`);
                    }
                };
            }
            function createTriggerLoggingAddWatch(key) {
                return (file, cb, flags, options, detailInfo1, detailInfo2) => plainInvokeFactory[key].call(
                /*thisArgs*/
                void 0, file, (...args) => {
                    const triggerredInfo = `${key === "watchFile" ? "FileWatcher" : "DirectoryWatcher"}:: Triggered with ${args[0]} ${args[1] !== void 0 ? args[1] : ""}:: ${getWatchInfo(file, flags, options, detailInfo1, detailInfo2, getDetailWatchInfo)}`;
                    log(triggerredInfo);
                    const start = timestamp();
                    cb.call(
                    /*thisArg*/
                    void 0, ...args);
                    const elapsed = timestamp() - start;
                    log(`Elapsed:: ${elapsed}ms ${triggerredInfo}`);
                }, flags, options, detailInfo1, detailInfo2);
            }
            function getWatchInfo(file, flags, options, detailInfo1, detailInfo2, getDetailWatchInfo2) {
                return `WatchInfo: ${file} ${flags} ${JSON.stringify(options)} ${getDetailWatchInfo2 ? getDetailWatchInfo2(detailInfo1, detailInfo2) : detailInfo2 === void 0 ? detailInfo1 : `${detailInfo1} ${detailInfo2}`}`;
            }
        }