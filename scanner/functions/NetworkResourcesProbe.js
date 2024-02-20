function NetworkResourcesProbe() {

    /**
     * "outputRawData" config option to decide whether or not Metric should return raw data
     *
     * "resultsBeforeStart" window.performance.getEntries() track all resources, even before browser-perf is started.
     * With this option, metric could return all ("true") results or only between Probe "start" and "teardown" ("false")
     *
     * @type {{outputRawData: boolean, resultsBeforeStart: boolean}}
     */
    this.defaultOptions = {
        'outputRawData' : false,
        'resultsBeforeStart' : false
    };

    this.lastResourceTime = 0;

    events.EventEmitter.call(this);
}