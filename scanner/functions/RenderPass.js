constructor(graphicsDevice) {
        DebugHelper.setName(this, this.constructor.name);
        Debug.assert(graphicsDevice);
        this.device = graphicsDevice;
    }