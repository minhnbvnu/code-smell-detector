function wcwidthBMP(ucs) {
        if (ucs === 0) {
            return opts.nul;
        }
        if (ucs < 32 || (ucs >= 0x7f && ucs < 0xa0)) {
            return opts.control;
        }
        if (bisearch(ucs, COMBINING_BMP)) {
            return 0;
        }
        if (isWideBMP(ucs)) {
            return 2;
        }
        return 1;
    }