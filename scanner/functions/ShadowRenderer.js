constructor(renderer, lightTextureAtlas) {
        this.device = renderer.device;

        /** @type {import('./renderer.js').Renderer} */
        this.renderer = renderer;

        /** @type {import('../lighting/light-texture-atlas.js').LightTextureAtlas} */
        this.lightTextureAtlas = lightTextureAtlas;

        const scope = this.device.scope;

        this.polygonOffsetId = scope.resolve('polygonOffset');
        this.polygonOffset = new Float32Array(2);

        // VSM
        this.sourceId = scope.resolve('source');
        this.pixelOffsetId = scope.resolve('pixelOffset');
        this.weightId = scope.resolve('weight[0]');
        this.blurVsmShaderCode = [shaderChunks.blurVSMPS, '#define GAUSS\n' + shaderChunks.blurVSMPS];
        const packed = '#define PACKED\n';
        this.blurPackedVsmShaderCode = [packed + this.blurVsmShaderCode[0], packed + this.blurVsmShaderCode[1]];

        // cache for vsm blur shaders
        this.blurVsmShader = [{}, {}];
        this.blurPackedVsmShader = [{}, {}];

        this.blurVsmWeights = {};

        // uniforms
        this.shadowMapLightRadiusId = scope.resolve('light_radius');

        // view bind group format with its uniform buffer format
        this.viewUniformFormat = null;
        this.viewBindGroupFormat = null;

        // blend states
        this.blendStateWrite = new BlendState();
        this.blendStateNoWrite = new BlendState();
        this.blendStateNoWrite.setColorWrite(false, false, false, false);
    }