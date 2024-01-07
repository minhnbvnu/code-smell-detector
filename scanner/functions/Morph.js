constructor(targets, graphicsDevice, { preferHighPrecision = false } = {}) {
        super();

        Debug.assertDeprecated(graphicsDevice, "Morph constructor takes a GraphicsDevice as a parameter, and it was not provided.");
        this.device = graphicsDevice || GraphicsDeviceAccess.get();

        this.preferHighPrecision = preferHighPrecision;

        // validation
        Debug.assert(targets.every(target => !target.used), 'A specified target has already been used to create a Morph, use its clone instead.');
        this._targets = targets.slice();

        // default to texture based morphing if available
        const device = this.device;
        if (device.supportsMorphTargetTexturesCore) {

            // renderable format
            const renderableHalf = (device.extTextureHalfFloat && device.textureHalfFloatRenderable) ? PIXELFORMAT_RGBA16F : undefined;
            const renderableFloat = (device.extTextureFloat && device.textureFloatRenderable) ? PIXELFORMAT_RGBA32F : undefined;
            this._renderTextureFormat = this.preferHighPrecision ?
                (renderableFloat ?? renderableHalf) : (renderableHalf ?? renderableFloat);

            // texture format
            const textureHalf = (device.extTextureHalfFloat && device.textureHalfFloatUpdatable) ? PIXELFORMAT_RGBA16F : undefined;
            const textureFloat = device.extTextureFloat ? PIXELFORMAT_RGB32F : undefined;
            this._textureFormat = this.preferHighPrecision ?
                (textureFloat ?? textureHalf) : (textureHalf ?? textureFloat);

            // if both available, enable texture morphing
            if (this._renderTextureFormat !== undefined && this._textureFormat !== undefined) {
                this._useTextureMorph = true;
            }
        }

        this._init();
        this._updateMorphFlags();
    }