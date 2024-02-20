function reglBuffer(options) {
                    var usage = GL_STATIC_DRAW;
                    var data = null;
                    var byteLength = 0;
                    var dtype = 0;
                    var dimension = 1;
                    if (Array.isArray(options) ||
                        isTypedArray(options) ||
                        isNDArrayLike(options) ||
                        options instanceof ArrayBuffer) {
                        data = options;
                    }
                    else if (typeof options === 'number') {
                        byteLength = options | 0;
                    }
                    else if (options) {
                        check$1.type(options, 'object', 'buffer arguments must be an object, a number or an array');
                        if ('data' in options) {
                            check$1(data === null ||
                                Array.isArray(data) ||
                                isTypedArray(data) ||
                                isNDArrayLike(data), 'invalid data for buffer');
                            data = options.data;
                        }
                        if ('usage' in options) {
                            check$1.parameter(options.usage, usageTypes, 'invalid buffer usage');
                            usage = usageTypes[options.usage];
                        }
                        if ('type' in options) {
                            check$1.parameter(options.type, glTypes, 'invalid buffer type');
                            dtype = glTypes[options.type];
                        }
                        if ('dimension' in options) {
                            check$1.type(options.dimension, 'number', 'invalid dimension');
                            dimension = options.dimension | 0;
                        }
                        if ('length' in options) {
                            check$1.nni(byteLength, 'buffer length must be a nonnegative integer');
                            byteLength = options.length | 0;
                        }
                    }
                    buffer.bind();
                    if (!data) {
                        // #475
                        if (byteLength)
                            gl.bufferData(buffer.type, byteLength, usage);
                        buffer.dtype = dtype || GL_UNSIGNED_BYTE$3;
                        buffer.usage = usage;
                        buffer.dimension = dimension;
                        buffer.byteLength = byteLength;
                    }
                    else {
                        initBufferFromData(buffer, data, usage, dtype, dimension, persistent);
                    }
                    if (config.profile) {
                        buffer.stats.size = buffer.byteLength * DTYPES_SIZES[buffer.dtype];
                    }
                    return reglBuffer;
                }