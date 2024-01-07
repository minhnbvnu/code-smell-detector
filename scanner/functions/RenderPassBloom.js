constructor(device, sourceTexture, format) {
        super(device);
        this.sourceTexture = sourceTexture;
        this.textureFormat = format;

        this.bloomRenderTarget = this.createRenderTarget(0);
        this.bloomTexture = this.bloomRenderTarget.colorBuffer;
    }