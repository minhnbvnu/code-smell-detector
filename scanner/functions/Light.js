constructor(graphicsDevice, clusteredLighting) {
        this.device = graphicsDevice;
        this.clusteredLighting = clusteredLighting;
        this.id = id++;

        // Light properties (defaults)
        this._type = LIGHTTYPE_DIRECTIONAL;
        this._color = new Color(0.8, 0.8, 0.8);
        this._intensity = 1;
        this._affectSpecularity = true;
        this._luminance = 0;
        this._castShadows = false;
        this._enabled = false;
        this._mask = MASK_AFFECT_DYNAMIC;
        this.isStatic = false;
        this.key = 0;
        this.bakeDir = true;
        this.bakeNumSamples = 1;
        this.bakeArea = 0;

        // Omni and spot properties
        this.attenuationStart = 10;
        this.attenuationEnd = 10;
        this._falloffMode = LIGHTFALLOFF_LINEAR;
        this._shadowType = SHADOW_PCF3;
        this._vsmBlurSize = 11;
        this.vsmBlurMode = BLUR_GAUSSIAN;
        this.vsmBias = 0.01 * 0.25;
        this._cookie = null; // light cookie texture (2D for spot, cubemap for omni)
        this.cookieIntensity = 1;
        this._cookieFalloff = true;
        this._cookieChannel = 'rgb';
        this._cookieTransform = null; // 2d rotation/scale matrix (spot only)
        this._cookieTransformUniform = new Float32Array(4);
        this._cookieOffset = null; // 2d position offset (spot only)
        this._cookieOffsetUniform = new Float32Array(2);
        this._cookieTransformSet = false;
        this._cookieOffsetSet = false;

        // Spot properties
        this._innerConeAngle = 40;
        this._outerConeAngle = 45;

        // Directional properties
        this.cascades = null;               // an array of Vec4 viewports per cascade
        this._shadowMatrixPalette = null;   // a float array, 16 floats per cascade
        this._shadowCascadeDistances = null;
        this.numCascades = 1;
        this.cascadeDistribution = 0.5;

        // Light source shape properties
        this._shape = LIGHTSHAPE_PUNCTUAL;

        // Cache of light property data in a format more friendly for shader uniforms
        this._finalColor = new Float32Array([0.8, 0.8, 0.8]);
        const c = Math.pow(this._finalColor[0], 2.2);
        this._linearFinalColor = new Float32Array([c, c, c]);

        this._position = new Vec3(0, 0, 0);
        this._direction = new Vec3(0, 0, 0);
        this._innerConeAngleCos = Math.cos(this._innerConeAngle * Math.PI / 180);
        this._updateOuterAngle(this._outerConeAngle);

        this._usePhysicalUnits = undefined;

        // Shadow mapping resources
        this._shadowMap = null;
        this._shadowRenderParams = [];
        this._shadowCameraParams = [];

        // Shadow mapping properties
        this.shadowDistance = 40;
        this._shadowResolution = 1024;
        this._shadowBias = -0.0005;
        this.shadowIntensity = 1.0;
        this._normalOffsetBias = 0.0;
        this.shadowUpdateMode = SHADOWUPDATE_REALTIME;
        this.shadowUpdateOverrides = null;
        this._penumbraSize = 1.0;
        this._isVsm = false;
        this._isPcf = true;

        // cookie matrix (used in case the shadow mapping is disabled and so the shadow matrix cannot be used)
        this._cookieMatrix = null;

        // viewport of the cookie texture / shadow in the atlas
        this._atlasViewport = null;
        this.atlasViewportAllocated = false;    // if true, atlas slot is allocated for the current frame
        this.atlasVersion = 0;      // version of the atlas for the allocated slot, allows invalidation when atlas recreates slots
        this.atlasSlotIndex = 0;    // allocated slot index, used for more persistent slot allocation
        this.atlasSlotUpdated = false;  // true if the atlas slot was reassigned this frame (and content needs to be updated)

        this._node = null;

        // private rendering data
        this._renderData = [];

        // true if the light is visible by any camera within a frame
        this.visibleThisFrame = false;

        // maximum size of the light bounding sphere on the screen by any camera within a frame
        // (used to estimate shadow resolution), range [0..1]
        this.maxScreenSize = 0;

        this._updateShadowBias();
    }