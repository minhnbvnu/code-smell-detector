function createDynamicPriorityPollingWatchFile(host) {
            const watchedFiles = [];
            const changedFilesInLastPoll = [];
            const lowPollingIntervalQueue = createPollingIntervalQueue(250 /* Low */);
            const mediumPollingIntervalQueue = createPollingIntervalQueue(500 /* Medium */);
            const highPollingIntervalQueue = createPollingIntervalQueue(2e3 /* High */);
            return watchFile2;
            function watchFile2(fileName, callback, defaultPollingInterval) {
                const file = {
                    fileName,
                    callback,
                    unchangedPolls: 0,
                    mtime: getModifiedTime(host, fileName)
                };
                watchedFiles.push(file);
                addToPollingIntervalQueue(file, defaultPollingInterval);
                return {
                    close: () => {
                        file.isClosed = true;
                        unorderedRemoveItem(watchedFiles, file);
                    }
                };
            }
            function createPollingIntervalQueue(pollingInterval) {
                const queue = [];
                queue.pollingInterval = pollingInterval;
                queue.pollIndex = 0;
                queue.pollScheduled = false;
                return queue;
            }
            function pollPollingIntervalQueue(queue) {
                queue.pollIndex = pollQueue(queue, queue.pollingInterval, queue.pollIndex, pollingChunkSize[queue.pollingInterval]);
                if (queue.length) {
                    scheduleNextPoll(queue.pollingInterval);
                }
                else {
                    Debug.assert(queue.pollIndex === 0);
                    queue.pollScheduled = false;
                }
            }
            function pollLowPollingIntervalQueue(queue) {
                pollQueue(changedFilesInLastPoll, 250 /* Low */, 
                /*pollIndex*/
                0, changedFilesInLastPoll.length);
                pollPollingIntervalQueue(queue);
                if (!queue.pollScheduled && changedFilesInLastPoll.length) {
                    scheduleNextPoll(250 /* Low */);
                }
            }
            function pollQueue(queue, pollingInterval, pollIndex, chunkSize) {
                return pollWatchedFileQueue(host, queue, pollIndex, chunkSize, onWatchFileStat);
                function onWatchFileStat(watchedFile, pollIndex2, fileChanged) {
                    if (fileChanged) {
                        watchedFile.unchangedPolls = 0;
                        if (queue !== changedFilesInLastPoll) {
                            queue[pollIndex2] = void 0;
                            addChangedFileToLowPollingIntervalQueue(watchedFile);
                        }
                    }
                    else if (watchedFile.unchangedPolls !== unchangedPollThresholds[pollingInterval]) {
                        watchedFile.unchangedPolls++;
                    }
                    else if (queue === changedFilesInLastPoll) {
                        watchedFile.unchangedPolls = 1;
                        queue[pollIndex2] = void 0;
                        addToPollingIntervalQueue(watchedFile, 250 /* Low */);
                    }
                    else if (pollingInterval !== 2e3 /* High */) {
                        watchedFile.unchangedPolls++;
                        queue[pollIndex2] = void 0;
                        addToPollingIntervalQueue(watchedFile, pollingInterval === 250 /* Low */ ? 500 /* Medium */ : 2e3 /* High */);
                    }
                }
            }
            function pollingIntervalQueue(pollingInterval) {
                switch (pollingInterval) {
                    case 250 /* Low */:
                        return lowPollingIntervalQueue;
                    case 500 /* Medium */:
                        return mediumPollingIntervalQueue;
                    case 2e3 /* High */:
                        return highPollingIntervalQueue;
                }
            }
            function addToPollingIntervalQueue(file, pollingInterval) {
                pollingIntervalQueue(pollingInterval).push(file);
                scheduleNextPollIfNotAlreadyScheduled(pollingInterval);
            }
            function addChangedFileToLowPollingIntervalQueue(file) {
                changedFilesInLastPoll.push(file);
                scheduleNextPollIfNotAlreadyScheduled(250 /* Low */);
            }
            function scheduleNextPollIfNotAlreadyScheduled(pollingInterval) {
                if (!pollingIntervalQueue(pollingInterval).pollScheduled) {
                    scheduleNextPoll(pollingInterval);
                }
            }
            function scheduleNextPoll(pollingInterval) {
                pollingIntervalQueue(pollingInterval).pollScheduled = host.setTimeout(pollingInterval === 250 /* Low */ ? pollLowPollingIntervalQueue : pollPollingIntervalQueue, pollingInterval, pollingIntervalQueue(pollingInterval));
            }
        }