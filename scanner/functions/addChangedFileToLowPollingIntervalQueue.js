function addChangedFileToLowPollingIntervalQueue(file) {
                changedFilesInLastPoll.push(file);
                scheduleNextPollIfNotAlreadyScheduled(250 /* Low */);
            }