constructor(canvas, options = {}) {
        super(canvas, options);
        options = this.initOptions;

        // alpha defaults to true
        options.alpha = options.alpha ?? true;

        this.backBufferAntialias = options.antialias ?? false;
        this.isWebGPU = true;
        this._deviceType = DEVICETYPE_WEBGPU;
    }