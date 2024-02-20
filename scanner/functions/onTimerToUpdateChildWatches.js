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