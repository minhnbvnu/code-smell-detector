function addCompletedFunc(fn) {
        // Only accept functions
        if (typeof fn !== 'function') return false;

        completed_fn.push(fn);

        // If we have already completed the emits, call this now
        if (completed && !prevented) fn();

        return this;
    }