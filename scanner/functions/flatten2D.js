function flatten2D(array, nx, ny, out) {
            var ptr = 0;
            for (var i = 0; i < nx; ++i) {
                var row = array[i];
                for (var j = 0; j < ny; ++j) {
                    out[ptr++] = row[j];
                }
            }
        }