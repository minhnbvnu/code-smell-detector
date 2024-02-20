function firstTimerInRange(clock, from, to) {
        var timers = clock.timers;
        var timer = null;
        var id, isInRange;

        for (id in timers) {
            if (timers.hasOwnProperty(id)) {
                isInRange = inRange(from, to, timers[id]);

                if (
                    isInRange &&
                    (!timer || compareTimers(timer, timers[id]) === 1)
                ) {
                    timer = timers[id];
                }
            }
        }

        return timer;
    }