constructor(device, camera, face, light) {

        // light this data belongs to
        this.light = light;

        // camera this applies to. Only used by directional light, as directional shadow map
        // is culled and rendered for each camera. Local lights' shadow is culled and rendered one time
        // and shared between cameras (even though it's not strictly correct and we can get shadows
        // from a mesh that is not visible by the camera)
        this.camera = camera;

        // camera used to cull / render the shadow map
        this.shadowCamera = ShadowRenderer.createShadowCamera(device, light._shadowType, light._type, face);

        // shadow view-projection matrix
        this.shadowMatrix = new Mat4();

        // viewport for the shadow rendering to the texture (x, y, width, height)
        this.shadowViewport = new Vec4(0, 0, 1, 1);

        // scissor rectangle for the shadow rendering to the texture (x, y, width, height)
        this.shadowScissor = new Vec4(0, 0, 1, 1);

        // depth range compensation for PCSS with directional lights
        this.depthRangeCompensation = 0;
        this.projectionCompensation = 0;

        // face index, value is based on light type:
        // - spot: always 0
        // - omni: cubemap face, 0..5
        // - directional: 0 for simple shadows, cascade index for cascaded shadow map
        this.face = face;

        // visible shadow casters
        this.visibleCasters = [];

        // an array of view bind groups, single entry is used for shadows
        /** @type {import('../platform/graphics/bind-group.js').BindGroup[]} */
        this.viewBindGroups = [];
    }