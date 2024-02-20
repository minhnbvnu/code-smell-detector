function createSolutionBuilderWithWatch(host, rootNames, defaultOptions, baseWatchOptions) {
            return createSolutionBuilderWorker(
            /*watch*/
            true, host, rootNames, defaultOptions, baseWatchOptions);
        }