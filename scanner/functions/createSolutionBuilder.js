function createSolutionBuilder(host, rootNames, defaultOptions) {
            return createSolutionBuilderWorker(
            /*watch*/
            false, host, rootNames, defaultOptions);
        }