constructor(inputBuffer, usage = BUFFER_GPUDYNAMIC) {
        this.device = inputBuffer.device;
        const gl = this.device.gl;

        Debug.assert(inputBuffer.format.interleaved || inputBuffer.format.elements.length <= 1,
                     "Vertex buffer used by TransformFeedback needs to be interleaved.");

        this._inputBuffer = inputBuffer;
        if (usage === BUFFER_GPUDYNAMIC && inputBuffer.usage !== usage) {
            // have to recreate input buffer with other usage
            gl.bindBuffer(gl.ARRAY_BUFFER, inputBuffer.impl.bufferId);
            gl.bufferData(gl.ARRAY_BUFFER, inputBuffer.storage, gl.DYNAMIC_COPY);
        }

        this._outputBuffer = new VertexBuffer(inputBuffer.device, inputBuffer.format, inputBuffer.numVertices, usage, inputBuffer.storage);
    }