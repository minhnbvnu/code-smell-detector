constructor(graphicsDevice, format, numVertices, usage = BUFFER_STATIC, initialData) {
        // By default, vertex buffers are static (better for performance since buffer data can be cached in VRAM)
        this.device = graphicsDevice;
        this.format = format;
        this.numVertices = numVertices;
        this.usage = usage;

        this.id = id++;

        this.impl = graphicsDevice.createVertexBufferImpl(this, format);

        // Calculate the size. If format contains verticesByteSize (non-interleaved format), use it
        this.numBytes = format.verticesByteSize ? format.verticesByteSize : format.size * numVertices;
        this.adjustVramSizeTracking(graphicsDevice._vram, this.numBytes);

        // Allocate the storage
        if (initialData) {
            this.setData(initialData);
        } else {
            this.storage = new ArrayBuffer(this.numBytes);
        }

        this.device.buffers.push(this);
    }