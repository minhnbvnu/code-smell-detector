function createFixedChunkSizePollingWatchFile(host) {
            const watchedFiles = [];
            let pollIndex = 0;
            let pollScheduled;
            return watchFile2;
            function watchFile2(fileName, callback) {
                const file = {
                    fileName,
                    callback,
                    mtime: getModifiedTime(host, fileName)
                };
                watchedFiles.push(file);
                scheduleNextPoll();
                return {
                    close: () => {
                        file.isClosed = true;
                        unorderedRemoveItem(watchedFiles, file);
                    }
                };
            }
            function pollQueue() {
                pollScheduled = void 0;
                pollIndex = pollWatchedFileQueue(host, watchedFiles, pollIndex, pollingChunkSize[250 /* Low */]);
                scheduleNextPoll();
            }
            function scheduleNextPoll() {
                if (!watchedFiles.length || pollScheduled)
                    return;
                pollScheduled = host.setTimeout(pollQueue, 2e3 /* High */);
            }
        }