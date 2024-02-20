function pollLowPollingIntervalQueue(queue) {
                pollQueue(changedFilesInLastPoll, 250 /* Low */, 
                /*pollIndex*/
                0, changedFilesInLastPoll.length);
                pollPollingIntervalQueue(queue);
                if (!queue.pollScheduled && changedFilesInLastPoll.length) {
                    scheduleNextPoll(250 /* Low */);
                }
            }