constructor(device, shadowRenderer, light, face, applyVsm) {
        super(device);
        DebugHelper.setName(this, `${this.name}-${light._node.name}`);

        this.requiresCubemaps = false;

        this.shadowRenderer = shadowRenderer;
        this.light = light;
        this.face = face;
        this.applyVsm = applyVsm;
        this.shadowCamera = shadowRenderer.prepareFace(light, null, face);

        // clear the render target as well, as it contains a single shadow map
        shadowRenderer.setupRenderPass(this, this.shadowCamera, true);
    }