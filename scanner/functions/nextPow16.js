function nextPow16(v) {
            for (var i = 16; i <= (1 << 28); i *= 16) {
                if (v <= i) {
                    return i;
                }
            }
            return 0;
        }