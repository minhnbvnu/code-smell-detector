constructor(device, cubeSlotsOffsets) {
        super(device);
        this._cubeSlotsOffsets = cubeSlotsOffsets;

        this.requiresCubemaps = false;

        this.blitTextureId = device.scope.resolve('blitTexture');
        this.invViewProjId = device.scope.resolve('invViewProj');
    }