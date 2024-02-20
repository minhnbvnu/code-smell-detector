function createSingleWatcherPerName(cache, useCaseSensitiveFileNames, name, callback, createWatcher) {
            const toCanonicalFileName = createGetCanonicalFileName(useCaseSensitiveFileNames);
            const path = toCanonicalFileName(name);
            const existing = cache.get(path);
            if (existing) {
                existing.callbacks.push(callback);
            }
            else {
                cache.set(path, {
                    watcher: createWatcher(
                    // Cant infer types correctly so lets satisfy checker
                    (param1, param2, param3) => {
                        var _a2;
                        return (_a2 = cache.get(path)) == null ? void 0 : _a2.callbacks.slice().forEach((cb) => cb(param1, param2, param3));
                    }),
                    callbacks: [callback]
                });
            }
            return {
                close: () => {
                    const watcher = cache.get(path);
                    if (!watcher)
                        return;
                    if (!orderedRemoveItem(watcher.callbacks, callback) || watcher.callbacks.length)
                        return;
                    cache.delete(path);
                    closeFileWatcherOf(watcher);
                }
            };
        }