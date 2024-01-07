constructor(graphicsDevice, uniforms) {
        this.scope = graphicsDevice.scope;

        /** @type {UniformFormat[]} */
        this.uniforms = uniforms;

        // TODO: optimize uniforms ordering

        let offset = 0;
        for (let i = 0; i < uniforms.length; i++) {
            const uniform = uniforms[i];
            uniform.calculateOffset(offset);
            offset = uniform.offset * 4 + uniform.byteSize;

            uniform.scopeId = this.scope.resolve(uniform.name);

            this.map.set(uniform.name, uniform);
        }

        // round up buffer size
        this.byteSize = math.roundUp(offset, 16);
    }