constructor(texture, targets) {

        // the actual texture buffer that is shared by shadow map render targets
        this.texture = texture;

        // set to true if the shadow map is owned by the shadow map cache
        this.cached = false;

        // an array of render targets:
        // 1 for directional and spot light
        // 6 for omni light
        this.renderTargets = targets;
    }