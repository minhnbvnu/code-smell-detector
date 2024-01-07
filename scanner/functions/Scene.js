constructor(graphicsDevice) {
        super();

        Debug.assertDeprecated(graphicsDevice, "Scene constructor takes a GraphicsDevice as a parameter, and it was not provided.");
        this.device = graphicsDevice || GraphicsDeviceAccess.get();

        this._gravity = new Vec3(0, -9.8, 0);

        /**
         * @type {import('./composition/layer-composition.js').LayerComposition}
         * @private
         */
        this._layers = null;

        this._fog = FOG_NONE;

        this._gammaCorrection = GAMMA_SRGB;
        this._toneMapping = 0;

        /**
         * Array of 6 prefiltered lighting data cubemaps.
         *
         * @type {import('../platform/graphics/texture.js').Texture[]}
         * @private
         */
        this._prefilteredCubemaps = [];

        // internally generated envAtlas owned by the scene
        this._internalEnvAtlas = null;

        this._skyboxIntensity = 1;
        this._skyboxLuminance = 0;
        this._skyboxMip = 0;

        this._skyboxRotationShaderInclude = false;
        this._skyboxRotation = new Quat();
        this._skyboxRotationMat3 = new Mat3();
        this._skyboxRotationMat4 = new Mat4();

        // ambient light lightmapping properties
        this._ambientBakeNumSamples = 1;
        this._ambientBakeSpherePart = 0.4;

        this._lightmapFilterRange = 10;
        this._lightmapFilterSmoothness = 0.2;

        // clustered lighting
        this._clusteredLightingEnabled = true;
        this._lightingParams = new LightingParams(this.device.supportsAreaLights, this.device.maxTextureSize, () => {
            this.updateShaders = true;
        });

        // skybox
        this._sky = new Sky(this);

        this._stats = {
            meshInstances: 0,
            lights: 0,
            dynamicLights: 0,
            bakedLights: 0,
            updateShadersTime: 0 // deprecated
        };

        /**
         * This flag indicates changes were made to the scene which may require recompilation of
         * shaders that reference global settings.
         *
         * @type {boolean}
         * @ignore
         */
        this.updateShaders = true;

        this._shaderVersion = 0;

        // immediate rendering
        this.immediate = new Immediate(this.device);
    }