function setSubData(data, offset) {
                    check$1(offset + data.byteLength <= buffer.byteLength, 'invalid buffer subdata call, buffer is too small. ' + ' Can\'t write data of size ' + data.byteLength + ' starting from offset ' + offset + ' to a buffer of size ' + buffer.byteLength);
                    gl.bufferSubData(buffer.type, offset, data);
                }