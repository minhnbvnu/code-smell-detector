function getModifiedTime2(state, fileName) {
            const path = toPath2(state, fileName);
            const existing = state.filesWatched.get(path);
            if (state.watch && !!existing) {
                if (!isFileWatcherWithModifiedTime(existing))
                    return existing;
                if (existing.modifiedTime)
                    return existing.modifiedTime;
            }
            const result = getModifiedTime(state.host, fileName);
            if (state.watch) {
                if (existing)
                    existing.modifiedTime = result;
                else
                    state.filesWatched.set(path, result);
            }
            return result;
        }