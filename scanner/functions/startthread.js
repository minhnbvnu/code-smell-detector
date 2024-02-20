function startthread(num, func) {
    if (num < threadcount) {
        logger.debug("Thread " + num + " started.");
        threadstatus[num] = "running";
        func(num, function () {
            threadstatus[num] = "stopped";
            logger.debug("Thread " + num + " stopped.");
        });
    }
}