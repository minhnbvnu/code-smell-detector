constructor(indexBuffer) {
        super();

        Debug.assert(indexBuffer.format !== INDEXFORMAT_UINT8, "WebGPU does not support 8-bit index buffer format");
        this.format = indexBuffer.format === INDEXFORMAT_UINT16 ? "uint16" : "uint32";
    }