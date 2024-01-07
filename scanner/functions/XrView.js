constructor(manager, xrView) {
        this._manager = manager;
        this._xrView = xrView;

        if (this._manager.views.supportedColor) {
            this._xrCamera = this._xrView.camera;

            // color texture
            if (this._manager.views.availableColor && this._xrCamera) {
                this._textureColor = new Texture(this._manager.app.graphicsDevice, {
                    format: PIXELFORMAT_RGB8,
                    mipmaps: false,
                    addressU: ADDRESS_CLAMP_TO_EDGE,
                    addressV: ADDRESS_CLAMP_TO_EDGE,
                    minFilter: FILTER_LINEAR,
                    magFilter: FILTER_LINEAR,
                    width: this._xrCamera.width,
                    height: this._xrCamera.height,
                    name: `XrView-${this._xrView.eye}-Color`
                });

                this._manager.app.graphicsDevice?.on('devicelost', this._onDeviceLost, this);
            }
        }
    }