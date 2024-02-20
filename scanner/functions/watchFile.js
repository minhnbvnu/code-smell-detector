function watchFile(state, file, callback, pollingInterval, options, watchType, project) {
            const path = toPath2(state, file);
            const existing = state.filesWatched.get(path);
            if (existing && isFileWatcherWithModifiedTime(existing)) {
                existing.callbacks.push(callback);
            }
            else {
                const watcher = state.watchFile(file, (fileName, eventKind, modifiedTime) => {
                    const existing2 = Debug.checkDefined(state.filesWatched.get(path));
                    Debug.assert(isFileWatcherWithModifiedTime(existing2));
                    existing2.modifiedTime = modifiedTime;
                    existing2.callbacks.forEach((cb) => cb(fileName, eventKind, modifiedTime));
                }, pollingInterval, options, watchType, project);
                state.filesWatched.set(path, { callbacks: [callback], watcher, modifiedTime: existing });
            }
            return {
                close: () => {
                    const existing2 = Debug.checkDefined(state.filesWatched.get(path));
                    Debug.assert(isFileWatcherWithModifiedTime(existing2));
                    if (existing2.callbacks.length === 1) {
                        state.filesWatched.delete(path);
                        closeFileWatcherOf(existing2);
                    }
                    else {
                        unorderedRemoveItem(existing2.callbacks, callback);
                    }
                }
            };
        }