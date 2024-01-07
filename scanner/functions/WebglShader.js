constructor(shader) {
        this.init();

        // kick off vertex and fragment shader compilation, but not linking here, as that would
        // make it blocking.
        this.compile(shader.device, shader);

        // add the shader to recently created list
        WebglShader.getBatchShaders(shader.device).push(shader);

        // add it to a device list of all shaders
        shader.device.shaders.push(shader);
    }