constructor(app) {
        this.glbContainerParser = new GlbContainerParser(app.graphicsDevice, app.assets, 0);
        this.parsers = { };
    }