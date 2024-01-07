constructor() {
        this.active = {};
        this.workerCount = typeof window !== 'undefined' ? (window.MAPTALKS_WORKER_COUNT || workerCount) : 0;
        this._messages = [];
        this._messageBuffers = [];
    }