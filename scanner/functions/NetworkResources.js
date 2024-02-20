function NetworkResources() {

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

    // Initialize result statistics object
    this.stats = {};

    // Check http://www.w3.org/TR/resource-timing/ for available types
    this.typesMapping = {
        'subdocument' : 'iframe',
        'iframe' : 'iframe',
        'img' : 'image',
        'link' : 'css',
        'script' : 'js',
        'css' : 'image', //mean resource is loaded from CSS file
        'xmlhttprequest' : 'xhrrequest'
    };

    BaseMetrics.apply(this, arguments);
}