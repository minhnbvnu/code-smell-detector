function createPollingIntervalQueue(pollingInterval) {
                const queue = [];
                queue.pollingInterval = pollingInterval;
                queue.pollIndex = 0;
                queue.pollScheduled = false;
                return queue;
            }