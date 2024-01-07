constructor(app) {
        this._assets = app.assets;
        this._device = app.graphicsDevice;
        this.maxRetries = 0;
    }