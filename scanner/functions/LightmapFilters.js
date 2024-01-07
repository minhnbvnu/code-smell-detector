constructor(device) {
        this.device = device;
        this.shaderDilate = createShaderFromCode(device, shaderChunks.fullscreenQuadVS, shaderChunksLightmapper.dilatePS, 'lmDilate');

        this.constantTexSource = device.scope.resolve('source');

        this.constantPixelOffset = device.scope.resolve('pixelOffset');
        this.pixelOffset = new Float32Array(2);

        // denoise is optional and gets created only when needed
        this.shaderDenoise = null;
        this.sigmas = null;
        this.constantSigmas = null;
        this.kernel = null;
    }