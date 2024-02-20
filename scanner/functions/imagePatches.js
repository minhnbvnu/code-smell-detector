function imagePatches(images, windowHeight, windowWidth, strideY, strideX) {
    if (images.value.shape.length !== 4) {
        throw Error('expected 4-D image tensor');
    } else if (images.value.shape[1] < windowHeight || images.value.shape[2] < windowWidth) {
        throw Error('window larger than image');
    }
    var rowSize = shapeProduct(images.value.shape.slice(2));
    var depth = images.value.shape[3];
    var result = new Tensor([
        images.value.shape[0],
        1 + Math.floor((images.value.shape[1] - windowHeight) / strideY),
        1 + Math.floor((images.value.shape[2] - windowWidth) / strideX),
        windowHeight,
        windowWidth,
        depth
    ]);
    var dstIdx = 0;
    for (var i = 0; i < result.shape[0]; ++i) {
        var batchStart = i * shapeProduct(images.value.shape.slice(1));
        for (var j = 0; j < result.shape[1]; ++j) {
            for (var k = 0; k < result.shape[2]; ++k) {
                var srcIdx = batchStart + (j * strideY * rowSize) + (k * strideX * depth);
                for (var l = 0; l < windowHeight; ++l) {
                    var rowStart = srcIdx + l * rowSize;
                    for (var m = 0; m < windowWidth * depth; ++m) {
                        result.data[dstIdx++] = images.value.data[rowStart + m];
                    }
                }
            }
        }
    }
    return {
        value: result,
        backward: function(outGrad) {
            var inGrad = new Tensor(images.value.shape);
            var outIdx = 0;
            for (var i = 0; i < result.shape[0]; ++i) {
                var batchStart = i * shapeProduct(images.value.shape.slice(1));
                for (var j = 0; j < result.shape[1]; ++j) {
                    for (var k = 0; k < result.shape[2]; ++k) {
                        var srcIdx = batchStart + (j * strideY * rowSize) + (k * strideX * depth);
                        for (var l = 0; l < windowHeight; ++l) {
                            var rowStart = srcIdx + l * rowSize;
                            for (var m = 0; m < windowWidth * depth; ++m) {
                                inGrad.data[rowStart + m] += outGrad.data[outIdx++];
                            }
                        }
                    }
                }
            }
            images.backward(inGrad);
        }
    };
}