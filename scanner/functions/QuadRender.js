constructor(shader) {

        const device = shader.device;
        this.shader = shader;
        Debug.assert(shader);

        if (device.supportsUniformBuffers) {

            // add uniform buffer support to shader
            const processingOptions = new ShaderProcessorOptions();
            this.shader = processShader(shader, processingOptions);

            // uniform buffer
            const ubFormat = this.shader.meshUniformBufferFormat;
            if (ubFormat) {
                this.uniformBuffer = new UniformBuffer(device, ubFormat, false);
            }

            // bind group
            const bindGroupFormat = this.shader.meshBindGroupFormat;
            Debug.assert(bindGroupFormat);
            this.bindGroup = new BindGroup(device, bindGroupFormat, this.uniformBuffer);
            DebugHelper.setName(this.bindGroup, `QuadRender-MeshBindGroup_${this.bindGroup.id}`);
        }
    }