function enqueueJob(clock, job) {
        // enqueues a microtick-deferred task - ecma262/#sec-enqueuejob
        if (!clock.jobs) {
            clock.jobs = [];
        }
        clock.jobs.push(job);
    }