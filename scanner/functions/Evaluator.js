function Evaluator() {
        this.onResult = function() {};
        this._worker = new Worker(makeWorkerBlob(WORKER_DATA));
        this._queuedJob = null;
        this._runningJob = false;
        this._worker.onmessage = function(msg) {
            this._runningJob = false;
            if (this._queuedJob) {
                this._queuedJob = null;
                this.evaluate(tensors);
            } else {
                this.onResult(msg.data);
            }
        }.bind(this);
    }