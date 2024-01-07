constructor(canvas, options) {
        super();

        this.canvas = canvas;

        // copy options and handle defaults
        this.initOptions = { ...options };
        this.initOptions.depth ??= true;
        this.initOptions.stencil ??= true;
        this.initOptions.antialias ??= true;
        this.initOptions.powerPreference ??= 'high-performance';

        // Some devices window.devicePixelRatio can be less than one
        // eg Oculus Quest 1 which returns a window.devicePixelRatio of 0.8
        this._maxPixelRatio = platform.browser ? Math.min(1, window.devicePixelRatio) : 1;

        this.buffers = [];

        this._vram = {
            // #if _PROFILER
            texShadow: 0,
            texAsset: 0,
            texLightmap: 0,
            // #endif
            tex: 0,
            vb: 0,
            ib: 0,
            ub: 0
        };

        this._shaderStats = {
            vsCompiled: 0,
            fsCompiled: 0,
            linked: 0,
            materialShaders: 0,
            compileTime: 0
        };

        this.initializeContextCaches();

        // Profiler stats
        this._drawCallsPerFrame = 0;
        this._shaderSwitchesPerFrame = 0;

        this._primsPerFrame = [];
        for (let i = PRIMITIVE_POINTS; i <= PRIMITIVE_TRIFAN; i++) {
            this._primsPerFrame[i] = 0;
        }
        this._renderTargetCreationTime = 0;

        // Create the ScopeNamespace for shader attributes and variables
        this.scope = new ScopeSpace("Device");

        this.textureBias = this.scope.resolve("textureBias");
        this.textureBias.setValue(0.0);
    }