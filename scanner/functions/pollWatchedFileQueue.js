function pollWatchedFileQueue(host, queue, pollIndex, chunkSize, callbackOnWatchFileStat) {
            let definedValueCopyToIndex = pollIndex;
            for (let canVisit = queue.length; chunkSize && canVisit; nextPollIndex(), canVisit--) {
                const watchedFile = queue[pollIndex];
                if (!watchedFile) {
                    continue;
                }
                else if (watchedFile.isClosed) {
                    queue[pollIndex] = void 0;
                    continue;
                }
                chunkSize--;
                const fileChanged = onWatchedFileStat(watchedFile, getModifiedTime(host, watchedFile.fileName));
                if (watchedFile.isClosed) {
                    queue[pollIndex] = void 0;
                    continue;
                }
                callbackOnWatchFileStat == null ? void 0 : callbackOnWatchFileStat(watchedFile, pollIndex, fileChanged);
                if (queue[pollIndex]) {
                    if (definedValueCopyToIndex < pollIndex) {
                        queue[definedValueCopyToIndex] = watchedFile;
                        queue[pollIndex] = void 0;
                    }
                    definedValueCopyToIndex++;
                }
            }
            return pollIndex;
            function nextPollIndex() {
                pollIndex++;
                if (pollIndex === queue.length) {
                    if (definedValueCopyToIndex < pollIndex) {
                        queue.length = definedValueCopyToIndex;
                    }
                    pollIndex = 0;
                    definedValueCopyToIndex = 0;
                }
            }
        }