constructor(filenamePrefix) {
        this._requestId = 0;
        this._pendingRequests = {};
        this._filenamePrefix = filenamePrefix;
        this._worker = new Worker(getWorkerUrl());
        this._worker.addEventListener('message', this._onMessage.bind(this));
    }