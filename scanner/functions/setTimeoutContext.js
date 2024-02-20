function setTimeoutContext(fn, timeout, context) {
            return setTimeout(bindFn(fn, context), timeout);
        }