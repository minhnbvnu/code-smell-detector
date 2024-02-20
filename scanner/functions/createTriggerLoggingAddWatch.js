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