function installSetTimeoutImplementation() {
        setImmediate = function() {
            setTimeout(flushQueue, 0);
            return addFromSetImmediateArguments(arguments);
        };
    }