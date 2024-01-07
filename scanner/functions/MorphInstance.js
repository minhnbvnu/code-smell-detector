constructor(morph) {
        /**
         * The morph with its targets, which is being instanced.
         *
         * @type {import('./morph.js').Morph}
         */
        this.morph = morph;
        morph.incRefCount();
        this.device = morph.device;

        // weights
        this._weights = [];
        this._weightMap = new Map();
        for (let v = 0; v < morph._targets.length; v++) {
            const target = morph._targets[v];
            if (target.name) {
                this._weightMap.set(target.name, v);
            }
            this.setWeight(v, target.defaultWeight);
        }

        // temporary array of targets with non-zero weight
        this._activeTargets = [];

        if (morph.useTextureMorph) {

            // shader cache
            this.shaderCache = {};

            // max number of morph targets rendered at a time (each uses single texture slot)
            this.maxSubmitCount = this.device.maxTextures;

            // array for max number of weights
            this._shaderMorphWeights = new Float32Array(this.maxSubmitCount);

            // create render targets to morph targets into
            const createRT = (name, textureVar) => {

                // render to appropriate, RGBA formats, we cannot render to RGB float / half float format in WEbGL
                this[textureVar] = morph._createTexture(name, morph._renderTextureFormat);
                return new RenderTarget({
                    colorBuffer: this[textureVar],
                    depth: false
                });
            };

            if (morph.morphPositions) {
                this.rtPositions = createRT('MorphRTPos', 'texturePositions');
            }

            if (morph.morphNormals) {
                this.rtNormals = createRT('MorphRTNrm', 'textureNormals');
            }

            // texture params
            this._textureParams = new Float32Array([morph.morphTextureWidth, morph.morphTextureHeight,
                1 / morph.morphTextureWidth, 1 / morph.morphTextureHeight]);

            // resolve possible texture names
            for (let i = 0; i < this.maxSubmitCount; i++) {
                this['morphBlendTex' + i] = this.device.scope.resolve('morphBlendTex' + i);
            }

            this.morphFactor = this.device.scope.resolve('morphFactor[0]');

            // true indicates render target textures are full of zeros to avoid rendering to them when all weights are zero
            this.zeroTextures = false;

        } else {    // vertex attribute based morphing

            // max number of morph targets rendered at a time
            this.maxSubmitCount = 8;

            // weights of active vertex buffers in format used by rendering
            this._shaderMorphWeights = new Float32Array(this.maxSubmitCount);                           // whole array
            this._shaderMorphWeightsA = new Float32Array(this._shaderMorphWeights.buffer, 0, 4);        // first 4 elements
            this._shaderMorphWeightsB = new Float32Array(this._shaderMorphWeights.buffer, 4 * 4, 4);    // second 4 elements

            // pre-allocate array of active vertex buffers used by rendering
            this._activeVertexBuffers = new Array(this.maxSubmitCount);
        }
    }