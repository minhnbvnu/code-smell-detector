constructor(device, renderer, shadowRenderer, shadowRendererLocal, lightTextureAtlas) {
        super(device);
        this.renderer = renderer;
        this.frameGraph = null;

        // render cookies for all local visible lights
        this.cookiesRenderPass = RenderPassCookieRenderer.create(lightTextureAtlas.cookieRenderTarget, lightTextureAtlas.cubeSlotsOffsets);
        this.beforePasses.push(this.cookiesRenderPass);

        // local shadows - these are shared by all cameras (not entirely correctly)
        this.shadowRenderPass = new RenderPassShadowLocalClustered(device, shadowRenderer, shadowRendererLocal);
        this.beforePasses.push(this.shadowRenderPass);
    }