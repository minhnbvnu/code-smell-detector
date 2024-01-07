constructor(graphicsDevice) {
        this.device = graphicsDevice;

        /** @type {import('../scene.js').Scene|null} */
        this.scene = null;

        // TODO: allocate only when the scene has clustered lighting enabled
        this.worldClustersAllocator = new WorldClustersAllocator(graphicsDevice);

        // texture atlas managing shadow map / cookie texture atlassing for omni and spot lights
        this.lightTextureAtlas = new LightTextureAtlas(graphicsDevice);

        // shadows
        this.shadowMapCache = new ShadowMapCache();
        this.shadowRenderer = new ShadowRenderer(this, this.lightTextureAtlas);
        this._shadowRendererLocal = new ShadowRendererLocal(this, this.shadowRenderer);
        this._shadowRendererDirectional = new ShadowRendererDirectional(this, this.shadowRenderer);

        // clustered passes
        this._renderPassUpdateClustered = new RenderPassUpdateClustered(this.device, this, this.shadowRenderer,
                                                                        this._shadowRendererLocal, this.lightTextureAtlas);

        // view bind group format with its uniform buffer format
        this.viewUniformFormat = null;
        this.viewBindGroupFormat = null;

        // timing
        this._skinTime = 0;
        this._morphTime = 0;
        this._cullTime = 0;
        this._shadowMapTime = 0;
        this._lightClustersTime = 0;
        this._layerCompositionUpdateTime = 0;

        // stats
        this._shadowDrawCalls = 0;
        this._skinDrawCalls = 0;
        this._instancedDrawCalls = 0;
        this._shadowMapUpdates = 0;
        this._numDrawCallsCulled = 0;
        this._camerasRendered = 0;
        this._lightClusters = 0;

        // Uniforms
        const scope = graphicsDevice.scope;
        this.boneTextureId = scope.resolve('texture_poseMap');
        this.boneTextureSizeId = scope.resolve('texture_poseMapSize');
        this.poseMatrixId = scope.resolve('matrix_pose[0]');

        this.modelMatrixId = scope.resolve('matrix_model');
        this.normalMatrixId = scope.resolve('matrix_normal');
        this.viewInvId = scope.resolve('matrix_viewInverse');
        this.viewPos = new Float32Array(3);
        this.viewPosId = scope.resolve('view_position');
        this.projId = scope.resolve('matrix_projection');
        this.projSkyboxId = scope.resolve('matrix_projectionSkybox');
        this.viewId = scope.resolve('matrix_view');
        this.viewId3 = scope.resolve('matrix_view3');
        this.viewProjId = scope.resolve('matrix_viewProjection');
        this.flipYId = scope.resolve('projectionFlipY');
        this.tbnBasis = scope.resolve('tbnBasis');
        this.nearClipId = scope.resolve('camera_near');
        this.farClipId = scope.resolve('camera_far');
        this.cameraParams = new Float32Array(4);
        this.cameraParamsId = scope.resolve('camera_params');

        this.alphaTestId = scope.resolve('alpha_ref');
        this.opacityMapId = scope.resolve('texture_opacityMap');

        this.exposureId = scope.resolve('exposure');
        this.twoSidedLightingNegScaleFactorId = scope.resolve('twoSidedLightingNegScaleFactor');
        this.twoSidedLightingNegScaleFactorId.setValue(0);

        this.morphWeightsA = scope.resolve('morph_weights_a');
        this.morphWeightsB = scope.resolve('morph_weights_b');
        this.morphPositionTex = scope.resolve('morphPositionTex');
        this.morphNormalTex = scope.resolve('morphNormalTex');
        this.morphTexParams = scope.resolve('morph_tex_params');

        // a single instance of light cube
        this.lightCube = new LightCube();
        this.constantLightCube = scope.resolve('lightCube[0]');
    }