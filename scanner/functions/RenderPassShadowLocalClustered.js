constructor(device, shadowRenderer, shadowRendererLocal) {
        super(device);

        this.requiresCubemaps = false;

        this.shadowRenderer = shadowRenderer;
        this.shadowRendererLocal = shadowRendererLocal;
    }