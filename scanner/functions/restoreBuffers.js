function restoreBuffers() {
                values(bufferSet).forEach(function (buffer) {
                    buffer.buffer = gl.createBuffer();
                    gl.bindBuffer(buffer.type, buffer.buffer);
                    gl.bufferData(buffer.type, buffer.persistentData || buffer.byteLength, buffer.usage);
                });
            }