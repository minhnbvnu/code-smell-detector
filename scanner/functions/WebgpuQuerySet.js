constructor(device, isTimestamp, capacity) {
        this.device = device;
        this.capacity = capacity;
        this.bytesPerSlot = isTimestamp ? 8 : 4;

        // query set
        const wgpu = device.wgpu;
        this.querySet = wgpu.createQuerySet({
            type: isTimestamp ? 'timestamp' : 'occlusion',
            count: capacity
        });
        DebugHelper.setLabel(this.querySet, `QuerySet-${isTimestamp ? 'Timestamp' : 'Occlusion'}`);

        // gpu buffer for query results GPU writes to
        this.queryBuffer = wgpu.createBuffer({
            size: this.bytesPerSlot * capacity,
            usage: GPUBufferUsage.QUERY_RESOLVE | GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST
        });
        DebugHelper.setLabel(this.queryBuffer, 'QueryGpuBuffer');
    }