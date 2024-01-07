constructor(device, options) {
        /**
         * @param {import('../../../platform/graphics/graphics-device.js').GraphicsDevice} device - The
         * graphics device.
         * @param {import('./lit-shader-options.js').LitShaderOptions} options - The
         * lit options.
         * @ignore
         */
        this.device = device;
        this.options = options;

        // resolve custom chunk attributes
        this.attributes = {
            vertex_position: SEMANTIC_POSITION
        };

        if (options.userAttributes) {
            for (const [semantic, name] of Object.entries(options.userAttributes)) {
                this.attributes[name] = semantic;
            }
        }

        if (options.chunks) {
            const userChunks = options.chunks;

            // #if _DEBUG
            validateUserChunks(userChunks);
            // #endif

            this.chunks = Object.create(shaderChunks);
            for (const chunkName in shaderChunks) {
                if (userChunks.hasOwnProperty(chunkName)) {
                    const chunk = userChunks[chunkName];
                    for (const a in builtinAttributes) {
                        if (builtinAttributes.hasOwnProperty(a) && chunk.indexOf(a) >= 0) {
                            this.attributes[a] = builtinAttributes[a];
                        }
                    }
                    this.chunks[chunkName] = chunk;
                }
            }
        } else {
            this.chunks = shaderChunks;
        }

        this.shaderPassInfo = ShaderPass.get(this.device).getByIndex(options.pass);
        this.shadowPass = this.shaderPassInfo.isShadow;

        this.lighting = (options.lights.length > 0) || options.dirLightMapEnabled || options.clusteredLightingEnabled;
        this.reflections = !!options.reflectionSource;
        this.needsNormal =
            this.lighting ||
            this.reflections ||
            options.useSpecular ||
            options.ambientSH ||
            options.useHeights ||
            options.enableGGXSpecular ||
            (options.clusteredLightingEnabled && !this.shadowPass) ||
            options.useClearCoatNormals;
        this.needsNormal = this.needsNormal && !this.shadowPass;
        this.needsSceneColor = options.useDynamicRefraction;
        this.needsScreenSize = options.useDynamicRefraction;
        this.needsTransforms = options.useDynamicRefraction;

        // generated by vshader
        this.varyings = "";
        this.varyingDefines = "";
        this.vshader = null;

        // supplied by caller
        this.frontendDecl = null;
        this.frontendCode = null;
        this.frontendFunc = null;
        this.lightingUv = null;

        // defines set by the shader generation
        this.defines = [];

        // generated by fshader
        this.fshader = null;
    }