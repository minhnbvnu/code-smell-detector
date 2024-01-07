constructor(app, options = {}) {
        super(app.graphicsDevice);
        this.app = app;
        this.options = this.sanitizeOptions(options);

        this.setupRenderPasses(this.options);
    }