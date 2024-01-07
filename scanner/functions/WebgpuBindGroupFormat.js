constructor(bindGroupFormat) {

        /** @type {import('./webgpu-graphics-device.js').WebgpuGraphicsDevice} */
        const device = bindGroupFormat.device;

        const { key, descr } = this.createDescriptor(bindGroupFormat);

        /**
         * Unique key, used for caching
         *
         * @type {number}
         */
        this.key = stringIds.get(key);

        // keep descr in debug mode
        Debug.call(() => {
            this.descr = descr;
        });

        /**
         * @type {GPUBindGroupLayout}
         * @private
         */
        this.bindGroupLayout = device.wgpu.createBindGroupLayout(descr);
        DebugHelper.setLabel(this.bindGroupLayout, bindGroupFormat.name);
    }