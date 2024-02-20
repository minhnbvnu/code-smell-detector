function subdata(data, offset_) {
                    var offset = (offset_ || 0) | 0;
                    var shape;
                    buffer.bind();
                    if (isTypedArray(data) || data instanceof ArrayBuffer) {
                        setSubData(data, offset);
                    }
                    else if (Array.isArray(data)) {
                        if (data.length > 0) {
                            if (typeof data[0] === 'number') {
                                var converted = pool.allocType(buffer.dtype, data.length);
                                copyArray(converted, data);
                                setSubData(converted, offset);
                                pool.freeType(converted);
                            }
                            else if (Array.isArray(data[0]) || isTypedArray(data[0])) {
                                shape = arrayShape(data);
                                var flatData = arrayFlatten(data, shape, buffer.dtype);
                                setSubData(flatData, offset);
                                pool.freeType(flatData);
                            }
                            else {
                                check$1.raise('invalid buffer data');
                            }
                        }
                    }
                    else if (isNDArrayLike(data)) {
                        shape = data.shape;
                        var stride = data.stride;
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
                        var dtype = Array.isArray(data.data)
                            ? buffer.dtype
                            : typedArrayCode(data.data);
                        var transposeData = pool.allocType(dtype, shapeX * shapeY);
                        transpose(transposeData, data.data, shapeX, shapeY, strideX, strideY, data.offset);
                        setSubData(transposeData, offset);
                        pool.freeType(transposeData);
                    }
                    else {
                        check$1.raise('invalid data for buffer subdata');
                    }
                    return reglBuffer;
                }