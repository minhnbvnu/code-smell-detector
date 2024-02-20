function addToPollingIntervalQueue(file, pollingInterval) {
                pollingIntervalQueue(pollingInterval).push(file);
                scheduleNextPollIfNotAlreadyScheduled(pollingInterval);
            }