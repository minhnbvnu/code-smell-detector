function initBufferFromTypedArray(buffer, data, usage) {
                buffer.byteLength = data.byteLength;
                gl.bufferData(buffer.type, data, usage);
            }