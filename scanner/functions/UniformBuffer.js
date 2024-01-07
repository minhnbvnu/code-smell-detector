constructor(graphicsDevice, format, persistent = true) {
        this.device = graphicsDevice;
        this.format = format;
        this.persistent = persistent;
        Debug.assert(format);

        if (persistent) {

            this.impl = graphicsDevice.createUniformBufferImpl(this);

            const storage = new ArrayBuffer(format.byteSize);
            this.assignStorage(new Int32Array(storage));

            graphicsDevice._vram.ub += this.format.byteSize;

            // TODO: register with the device and handle lost context
            // this.device.buffers.push(this);
        } else {

            this.allocation = new DynamicBufferAllocation();
        }
    }