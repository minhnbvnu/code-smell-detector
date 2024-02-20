function scheduleNextPollIfNotAlreadyScheduled(pollingInterval) {
                if (!pollingIntervalQueue(pollingInterval).pollScheduled) {
                    scheduleNextPoll(pollingInterval);
                }
            }