function flatten3D(array, nx, ny, nz, out, ptr_) {
            var ptr = ptr_;
            for (var i = 0; i < nx; ++i) {
                var row = array[i];
                for (var j = 0; j < ny; ++j) {
                    var col = row[j];
                    for (var k = 0; k < nz; ++k) {
                        out[ptr++] = col[k];
                    }
                }
            }
        }