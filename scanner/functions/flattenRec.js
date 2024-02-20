function flattenRec(array, shape, level, out, ptr) {
            var stride = 1;
            for (var i = level + 1; i < shape.length; ++i) {
                stride *= shape[i];
            }
            var n = shape[level];
            if (shape.length - level === 4) {
                var nx = shape[level + 1];
                var ny = shape[level + 2];
                var nz = shape[level + 3];
                for (i = 0; i < n; ++i) {
                    flatten3D(array[i], nx, ny, nz, out, ptr);
                    ptr += stride;
                }
            }
            else {
                for (i = 0; i < n; ++i) {
                    flattenRec(array[i], shape, level + 1, out, ptr);
                    ptr += stride;
                }
            }
        }