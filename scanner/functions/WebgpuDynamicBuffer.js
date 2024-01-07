constructor(device, size, isStaging) {
        super(device);

        this.buffer = device.wgpu.createBuffer({
            size: size,
            usage: isStaging ? GPUBufferUsage.MAP_WRITE | GPUBufferUsage.COPY_SRC : GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
            mappedAtCreation: isStaging
        });

        if (isStaging) {
            this.onAvailable();
        }

        // staging buffers are not stored in vram, but add them for tracking purposes anyways
        device._vram.ub += size;

        DebugHelper.setLabel(this.buffer, `DynamicBuffer-${isStaging ? 'Staging' : 'Gpu'}`);
    }