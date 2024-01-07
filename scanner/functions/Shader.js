constructor(graphicsDevice, definition) {
        this.id = id++;
        this.device = graphicsDevice;
        this.definition = definition;
        this.name = definition.name || 'Untitled';
        this.init();

        if (definition.cshader) {
            Debug.assert(graphicsDevice.supportsCompute, 'Compute shaders are not supported on this device.');
            Debug.assert(!definition.vshader && !definition.fshader, 'Vertex and fragment shaders are not supported when creating a compute shader.');
        } else {
            Debug.assert(definition.vshader, 'No vertex shader has been specified when creating a shader.');
            Debug.assert(definition.fshader, 'No fragment shader has been specified when creating a shader.');

            // pre-process shader sources
            definition.vshader = Preprocessor.run(definition.vshader);
            definition.fshader = Preprocessor.run(definition.fshader, graphicsDevice.isWebGL2);
        }

        this.impl = graphicsDevice.createShaderImpl(this);

        Debug.trace(TRACEID_SHADER_ALLOC, `Alloc: ${this.label}, stack: ${DebugGraphics.toString()}`, {
            instance: this
        });
    }