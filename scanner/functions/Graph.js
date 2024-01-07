constructor(name, app, watermark, textRefreshRate, timer) {
        this.app = app;
        this.name = name;
        this.device = app.graphicsDevice;
        this.timer = timer;
        this.watermark = watermark;
        this.enabled = false;
        this.textRefreshRate = textRefreshRate;

        this.avgTotal = 0;
        this.avgTimer = 0;
        this.avgCount = 0;
        this.timingText = '';

        this.texture = null;
        this.yOffset = 0;
        this.cursor = 0;
        this.sample = new Uint8ClampedArray(4);
        this.sample.set([0, 0, 0, 255]);

        this.counter = 0;

        this.app.on('frameupdate', this.update, this);
    }