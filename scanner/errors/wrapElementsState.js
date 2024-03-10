            function initElements(elements, data, usage, prim, count, byteLength, type) {
                elements.buffer.bind();
                var dtype;
                if (data) {
                    var predictedType = type;
                    if (!type && (!isTypedArray(data) ||
                        (isNDArrayLike(data) && !isTypedArray(data.data)))) {
                        predictedType = extensions.oes_element_index_uint
                            ? GL_UNSIGNED_INT$2
                            : GL_UNSIGNED_SHORT$2;
                    }
                    bufferState._initBuffer(elements.buffer, data, usage, predictedType, 3);
                }
                else {
                    gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, byteLength, usage);
                    elements.buffer.dtype = dtype || GL_UNSIGNED_BYTE$4;
                    elements.buffer.usage = usage;
                    elements.buffer.dimension = 3;
                    elements.buffer.byteLength = byteLength;
                }
                dtype = type;
                if (!type) {
                    switch (elements.buffer.dtype) {
                        case GL_UNSIGNED_BYTE$4:
                        case GL_BYTE$2:
                            dtype = GL_UNSIGNED_BYTE$4;
                            break;
                        case GL_UNSIGNED_SHORT$2:
                        case GL_SHORT$2:
                            dtype = GL_UNSIGNED_SHORT$2;
                            break;
                        case GL_UNSIGNED_INT$2:
                        case GL_INT$2:
                            dtype = GL_UNSIGNED_INT$2;
                            break;
                        default:
                            check$1.raise('unsupported type for element array');
                    }
                    elements.buffer.dtype = dtype;
                }
                elements.type = dtype;
                // Check oes_element_index_uint extension
                check$1(dtype !== GL_UNSIGNED_INT$2 ||
                    !!extensions.oes_element_index_uint, '32 bit element buffers not supported, enable oes_element_index_uint first');
                // try to guess default primitive type and arguments
                var vertCount = count;
                if (vertCount < 0) {
                    vertCount = elements.buffer.byteLength;
                    if (dtype === GL_UNSIGNED_SHORT$2) {
                        vertCount >>= 1;
                    }
                    else if (dtype === GL_UNSIGNED_INT$2) {
                        vertCount >>= 2;
                    }
                }
                elements.vertCount = vertCount;
                // try to guess primitive type from cell dimension
                var primType = prim;
                if (prim < 0) {
                    primType = GL_TRIANGLES;
                    var dimension = elements.buffer.dimension;
                    if (dimension === 1)
                        primType = GL_POINTS;
                    if (dimension === 2)
                        primType = GL_LINES;
                    if (dimension === 3)
                        primType = GL_TRIANGLES;
                }
                elements.primType = primType;
            }