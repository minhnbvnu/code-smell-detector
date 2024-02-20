function scheduleNextPoll() {
                if (!watchedFiles.length || pollScheduled)
                    return;
                pollScheduled = host.setTimeout(pollQueue, 2e3 /* High */);
            }