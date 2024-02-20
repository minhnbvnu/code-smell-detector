function LoadManager(options) {

    options = options || {};

    // Map from url to:
    // {
    //   raw      : result of the fetch
    //   status   : 'loading', 'success', 'failure'
    //   post     : Map from post-processing functions (and null) to:
    //      {
    //            value: value
    //            callbacks: array of callbacks to invoke when data arrives and is post-processed
    //            errorCallbacks: etc.
    //      }
    // }
    
    this.resource = new Map();
    this.crossOrigin = 'anonymous';
    this.pendingRequests = 0;

    // 'accepting requests', 'loading', 'complete', 'failure'
    this.status = 'accepting requests';

    this.forceReload = options.forceReload || false;

    // Invoke when pendingRequests hits zero if status is not 'failure'
    this.callback = options.callback;
    this.errorCallback = options.errorCallback;
    this.jsonParser = options.jsonParser || 'local';
}