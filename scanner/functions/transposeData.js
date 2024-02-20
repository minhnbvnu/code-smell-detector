function transposeData(image, array, strideX, strideY, strideC, offset) {
            var w = image.width;
            var h = image.height;
            var c = image.channels;
            var n = w * h * c;
            var data = preConvert(image, n);
            var p = 0;
            for (var i = 0; i < h; ++i) {
                for (var j = 0; j < w; ++j) {
                    for (var k = 0; k < c; ++k) {
                        data[p++] = array[strideX * j + strideY * i + strideC * k + offset];
                    }
                }
            }
            postConvert(image, data);
        }