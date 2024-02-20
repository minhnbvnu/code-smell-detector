function wavb(src) {
        var wave = new Float32Array(1024);
        var n = src.length >> 1;
        if ([2,4,8,16,32,64,128,256,512,1024].indexOf(n) !== -1) {

            for (var i = 0, k = 0; i < n; ++i) {
                var x = parseInt(src.substr(i * 2, 2), 16);

                x = (x & 0x80) ? (x-256) / 128.0 : x / 127.0;
                for (var j = 0, jmax = 1024 / n; j < jmax; ++j) {
                    wave[k++] = x;
                }
            }
        }
        return wave;
    }