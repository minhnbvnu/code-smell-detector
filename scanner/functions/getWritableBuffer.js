function getWritableBuffer() {
        var currentSize = 0;
        var buffer = null;
        const stream = new Writable({
            write(chunk, encoding, callback) {
                if (!buffer) {
                    buffer = Buffer.from(chunk);
                } else {
                    var newBuffer = Buffer.allocUnsafe(currentSize + chunk.length);
                    buffer.copy(newBuffer);
                    chunk.copy(newBuffer,currentSize);
                    buffer = newBuffer;
                }
                currentSize += chunk.length
                callback();
            }
        });
        return {
            stream:  stream,
            getBuffer: function() {
                return buffer;
            }
        }
    }