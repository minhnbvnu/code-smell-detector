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