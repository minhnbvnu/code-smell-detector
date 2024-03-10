            function initBufferFromData(buffer, data, usage, dtype, dimension, persist) {
                var shape;
                buffer.usage = usage;
                if (Array.isArray(data)) {
                    buffer.dtype = dtype || GL_FLOAT$3;
                    if (data.length > 0) {
                        var flatData;
                        if (Array.isArray(data[0])) {
                            shape = arrayShape(data);
                            var dim = 1;
                            for (var i = 1; i < shape.length; ++i) {
                                dim *= shape[i];
                            }
                            buffer.dimension = dim;
                            flatData = arrayFlatten(data, shape, buffer.dtype);
                            initBufferFromTypedArray(buffer, flatData, usage);
                            if (persist) {
                                buffer.persistentData = flatData;
                            }
                            else {
                                pool.freeType(flatData);
                            }
                        }
                        else if (typeof data[0] === 'number') {
                            buffer.dimension = dimension;
                            var typedData = pool.allocType(buffer.dtype, data.length);
                            copyArray(typedData, data);
                            initBufferFromTypedArray(buffer, typedData, usage);
                            if (persist) {
                                buffer.persistentData = typedData;
                            }
                            else {
                                pool.freeType(typedData);
                            }
                        }
                        else if (isTypedArray(data[0])) {
                            buffer.dimension = data[0].length;
                            buffer.dtype = dtype || typedArrayCode(data[0]) || GL_FLOAT$3;
                            flatData = arrayFlatten(data, [data.length, data[0].length], buffer.dtype);
                            initBufferFromTypedArray(buffer, flatData, usage);
                            if (persist) {
                                buffer.persistentData = flatData;
                            }
                            else {
                                pool.freeType(flatData);
                            }
                        }
                        else {
                            check$1.raise('invalid buffer data');
                        }
                    }
                }
                else if (isTypedArray(data)) {
                    buffer.dtype = dtype || typedArrayCode(data);
                    buffer.dimension = dimension;
                    initBufferFromTypedArray(buffer, data, usage);
                    if (persist) {
                        buffer.persistentData = new Uint8Array(new Uint8Array(data.buffer));
                    }
                }
                else if (isNDArrayLike(data)) {
                    shape = data.shape;
                    var stride = data.stride;
                    var offset = data.offset;
                    var shapeX = 0;
                    var shapeY = 0;
                    var strideX = 0;
                    var strideY = 0;
                    if (shape.length === 1) {
                        shapeX = shape[0];
                        shapeY = 1;
                        strideX = stride[0];
                        strideY = 0;
                    }
                    else if (shape.length === 2) {
                        shapeX = shape[0];
                        shapeY = shape[1];
                        strideX = stride[0];
                        strideY = stride[1];
                    }
                    else {
                        check$1.raise('invalid shape');
                    }
                    buffer.dtype = dtype || typedArrayCode(data.data) || GL_FLOAT$3;
                    buffer.dimension = shapeY;
                    var transposeData = pool.allocType(buffer.dtype, shapeX * shapeY);
                    transpose(transposeData, data.data, shapeX, shapeY, strideX, strideY, offset);
                    initBufferFromTypedArray(buffer, transposeData, usage);
                    if (persist) {
                        buffer.persistentData = transposeData;
                    }
                    else {
                        pool.freeType(transposeData);
                    }
                }
                else if (data instanceof ArrayBuffer) {
                    buffer.dtype = GL_UNSIGNED_BYTE$3;
                    buffer.dimension = dimension;
                    initBufferFromTypedArray(buffer, data, usage);
                    if (persist) {
                        buffer.persistentData = new Uint8Array(new Uint8Array(data));
                    }
                }
                else {
                    check$1.raise('invalid buffer data');
                }
            }