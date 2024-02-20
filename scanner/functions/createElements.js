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