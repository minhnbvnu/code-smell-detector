function createElementStream(data) {
                var result = bufferPool.pop();
                if (!result) {
                    result = new REGLElementBuffer(bufferState.create(null, GL_ELEMENT_ARRAY_BUFFER, true, false)._buffer);
                }
                initElements(result, data, GL_STREAM_DRAW$1, -1, -1, 0, 0);
                return result;
            }