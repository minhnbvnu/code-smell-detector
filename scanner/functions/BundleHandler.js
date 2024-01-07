constructor(app) {
        this._assets = app.assets;
        this._worker = null;
        this.maxRetries = 0;
    }