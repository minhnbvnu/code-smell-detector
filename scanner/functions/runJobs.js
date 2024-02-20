function runJobs(clock) {
        // runs all microtick-deferred tasks - ecma262/#sec-runjobs
        if (!clock.jobs) {
            return;
        }
        for (var i = 0; i < clock.jobs.length; i++) {
            var job = clock.jobs[i];
            job.func.apply(null, job.args);
            if (clock.loopLimit && i > clock.loopLimit) {
                throw new Error(
                    "Aborting after running " +
                        clock.loopLimit +
                        " timers, assuming an infinite loop!"
                );
            }
        }
        clock.jobs = [];
    }