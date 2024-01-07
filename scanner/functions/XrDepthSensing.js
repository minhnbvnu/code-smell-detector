constructor(manager) {
        super();

        this._manager = manager;

        // TODO: data format can be different
        this._texture = new Texture(this._manager.app.graphicsDevice, {
            format: PIXELFORMAT_LA8,
            mipmaps: false,
            addressU: ADDRESS_CLAMP_TO_EDGE,
            addressV: ADDRESS_CLAMP_TO_EDGE,
            minFilter: FILTER_LINEAR,
            magFilter: FILTER_LINEAR,
            name: 'XRDepthSensing'
        });

        if (this.supported) {
            this._manager.on('start', this._onSessionStart, this);
            this._manager.on('end', this._onSessionEnd, this);
        }
    }