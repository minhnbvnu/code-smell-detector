constructor(manager) {
        super();

        this._manager = manager;
        this._manager.on('start', this._onSessionStart, this);
        this._manager.on('end', this._onSessionEnd, this);
    }