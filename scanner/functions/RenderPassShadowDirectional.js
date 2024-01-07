constructor(device, shadowRenderer, light, camera, allCascadesRendering) {
        super(device);
        DebugHelper.setName(this, `${this.name}-${light._node.name}`);

        this.shadowRenderer = shadowRenderer;
        this.light = light;
        this.camera = camera;
        this.allCascadesRendering = allCascadesRendering;
    }