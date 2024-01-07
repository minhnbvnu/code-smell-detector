constructor(graphicsDevice) {
        super(graphicsDevice);

        this.sceneTextureId = graphicsDevice.scope.resolve('sceneTexture');
        this.bloomTextureId = graphicsDevice.scope.resolve('bloomTexture');
        this.bloomIntensityId = graphicsDevice.scope.resolve('bloomIntensity');
        this.bcsId = graphicsDevice.scope.resolve('brightnessContrastSaturation');
        this.vignetterParamsId = graphicsDevice.scope.resolve('vignetterParams');
        this.fringingIntensityId = graphicsDevice.scope.resolve('fringingIntensity');
    }