function addPreventedFunc(fn) {
        // Only accept functions
        if (typeof fn !== 'function') return false;

        prevented_fn.push(fn);

        // If we have already completed the emits, call this now
        if (completed && prevented) fn();

        return this;
    }