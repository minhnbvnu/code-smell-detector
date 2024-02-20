function wrapElementsState(gl, extensions, bufferState, stats) {
            var elementSet = {};
            var elementCount = 0;
            var elementTypes = {
                'uint8': GL_UNSIGNED_BYTE$4,
                'uint16': GL_UNSIGNED_SHORT$2
            };
            if (extensions.oes_element_index_uint) {
                elementTypes.uint32 = GL_UNSIGNED_INT$2;
            }
            function REGLElementBuffer(buffer) {
                this.id = elementCount++;
                elementSet[this.id] = this;
                this.buffer = buffer;
                this.primType = GL_TRIANGLES;
                this.vertCount = 0;
                this.type = 0;
            }
            REGLElementBuffer.prototype.bind = function () {
                this.buffer.bind();
            };
            var bufferPool = [];
            function createElementStream(data) {
                var result = bufferPool.pop();
                if (!result) {
                    result = new REGLElementBuffer(bufferState.create(null, GL_ELEMENT_ARRAY_BUFFER, true, false)._buffer);
                }
                initElements(result, data, GL_STREAM_DRAW$1, -1, -1, 0, 0);
                return result;
            }
            function destroyElementStream(elements) {
                bufferPool.push(elements);
            }
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
            function destroyElements(elements) {
                stats.elementsCount--;
                check$1(elements.buffer !== null, 'must not double destroy elements');
                delete elementSet[elements.id];
                elements.buffer.destroy();
                elements.buffer = null;
            }
            function createElements(options, persistent) {
                var buffer = bufferState.create(null, GL_ELEMENT_ARRAY_BUFFER, true);
                var elements = new REGLElementBuffer(buffer._buffer);
                stats.elementsCount++;
                function reglElements(options) {
                    if (!options) {
                        buffer();
                        elements.primType = GL_TRIANGLES;
                        elements.vertCount = 0;
                        elements.type = GL_UNSIGNED_BYTE$4;
                    }
                    else if (typeof options === 'number') {
                        buffer(options);
                        elements.primType = GL_TRIANGLES;
                        elements.vertCount = options | 0;
                        elements.type = GL_UNSIGNED_BYTE$4;
                    }
                    else {
                        var data = null;
                        var usage = GL_STATIC_DRAW$1;
                        var primType = -1;
                        var vertCount = -1;
                        var byteLength = 0;
                        var dtype = 0;
                        if (Array.isArray(options) ||
                            isTypedArray(options) ||
                            isNDArrayLike(options)) {
                            data = options;
                        }
                        else {
                            check$1.type(options, 'object', 'invalid arguments for elements');
                            if ('data' in options) {
                                data = options.data;
                                check$1(Array.isArray(data) ||
                                    isTypedArray(data) ||
                                    isNDArrayLike(data), 'invalid data for element buffer');
                            }
                            if ('usage' in options) {
                                check$1.parameter(options.usage, usageTypes, 'invalid element buffer usage');
                                usage = usageTypes[options.usage];
                            }
                            if ('primitive' in options) {
                                check$1.parameter(options.primitive, primTypes, 'invalid element buffer primitive');
                                primType = primTypes[options.primitive];
                            }
                            if ('count' in options) {
                                check$1(typeof options.count === 'number' && options.count >= 0, 'invalid vertex count for elements');
                                vertCount = options.count | 0;
                            }
                            if ('type' in options) {
                                check$1.parameter(options.type, elementTypes, 'invalid buffer type');
                                dtype = elementTypes[options.type];
                            }
                            if ('length' in options) {
                                byteLength = options.length | 0;
                            }
                            else {
                                byteLength = vertCount;
                                if (dtype === GL_UNSIGNED_SHORT$2 || dtype === GL_SHORT$2) {
                                    byteLength *= 2;
                                }
                                else if (dtype === GL_UNSIGNED_INT$2 || dtype === GL_INT$2) {
                                    byteLength *= 4;
                                }
                            }
                        }
                        initElements(elements, data, usage, primType, vertCount, byteLength, dtype);
                    }
                    return reglElements;
                }
                reglElements(options);
                reglElements._reglType = 'elements';
                reglElements._elements = elements;
                reglElements.subdata = function (data, offset) {
                    buffer.subdata(data, offset);
                    return reglElements;
                };
                reglElements.destroy = function () {
                    destroyElements(elements);
                };
                return reglElements;
            }
            return {
                create: createElements,
                createStream: createElementStream,
                destroyStream: destroyElementStream,
                getElements: function (elements) {
                    if (typeof elements === 'function' &&
                        elements._elements instanceof REGLElementBuffer) {
                        return elements._elements;
                    }
                    return null;
                },
                clear: function () {
                    values(elementSet).forEach(destroyElements);
                }
            };
        }