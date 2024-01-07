constructor(indexBuffer) {
        super();

        const gl = indexBuffer.device.gl;
        const format = indexBuffer.format;
        if (format === INDEXFORMAT_UINT8) {
            this.glFormat = gl.UNSIGNED_BYTE;
        } else if (format === INDEXFORMAT_UINT16) {
            this.glFormat = gl.UNSIGNED_SHORT;
        } else if (format === INDEXFORMAT_UINT32) {
            this.glFormat = gl.UNSIGNED_INT;
        }
    }