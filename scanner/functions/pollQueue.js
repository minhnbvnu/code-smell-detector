function pollQueue() {
                pollScheduled = void 0;
                pollIndex = pollWatchedFileQueue(host, watchedFiles, pollIndex, pollingChunkSize[250 /* Low */]);
                scheduleNextPoll();
            }