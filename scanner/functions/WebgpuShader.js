constructor(shader) {
        /** @type {import('../shader.js').Shader} */
        this.shader = shader;

        const definition = shader.definition;
        Debug.assert(definition);

        if (definition.shaderLanguage === SHADERLANGUAGE_WGSL) {

            this._vertexCode = definition.vshader ?? null;
            this._fragmentCode = definition.fshader ?? null;
            this._computeCode = definition.cshader ?? null;
            this.vertexEntryPoint = 'vertexMain';
            this.fragmentEntryPoint = 'fragmentMain';
            shader.ready = true;

        } else {

            if (definition.processingOptions) {
                this.process();
            }
        }
    }