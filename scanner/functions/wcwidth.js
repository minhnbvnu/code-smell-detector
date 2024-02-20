function wcwidth(ucs) {
        if (ucs === 0)
            return opts.nul;
        if (ucs < 32 || (ucs >= 0x7f && ucs < 0xa0))
            return opts.control;
        if (bisearch(ucs))
            return 0;
        if (isWide(ucs)) {
            return 2;
        }
        return 1;
    }