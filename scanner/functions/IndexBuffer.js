constructor(graphicsDevice, format, numIndices, usage = BUFFER_STATIC, initialData) {
        // By default, index buffers are static (better for performance since buffer data can be cached in VRAM)
        this.device = graphicsDevice;
        this.format = format;
        this.numIndices = numIndices;
        this.usage = usage;

        this.id = id++;

        this.impl = graphicsDevice.createIndexBufferImpl(this);

        // Allocate the storage
        const bytesPerIndex = typedArrayIndexFormatsByteSize[format];
        this.bytesPerIndex = bytesPerIndex;
        this.numBytes = this.numIndices * bytesPerIndex;

        if (initialData) {
            this.setData(initialData);
        } else {
            this.storage = new ArrayBuffer(this.numBytes);
        }

        this.adjustVramSizeTracking(graphicsDevice._vram, this.numBytes);

        this.device.buffers.push(this);
    }