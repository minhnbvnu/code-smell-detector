constructor(graphicsDevice, shader) {
        this.device = graphicsDevice;
        this.shader = shader;

        if (graphicsDevice.supportsCompute) {
            this.impl = graphicsDevice.createComputeImpl(this);
        }
    }