constructor(app) {
        this._parsers = [];
        this.device = app.graphicsDevice;
        this.assets = app.assets;
        this.defaultMaterial = getDefaultMaterial(this.device);
        this.maxRetries = 0;

        this.addParser(new JsonModelParser(this), function (url, data) {
            return (path.getExtension(url) === '.json');
        });
        this.addParser(new GlbModelParser(this), function (url, data) {
            return (path.getExtension(url) === '.glb');
        });
    }