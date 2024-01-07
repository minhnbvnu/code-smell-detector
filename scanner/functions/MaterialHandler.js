constructor(app) {
        this._assets = app.assets;
        this._device = app.graphicsDevice;

        this._placeholderTextures = null;

        this._parser = new JsonStandardMaterialParser();
        this.maxRetries = 0;
    }