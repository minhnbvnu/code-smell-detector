function SHR3() {
        var jz = jsr;
        var jzr = jsr;
        jzr ^= (jzr << 13);
        jzr ^= (jzr >>> 17);
        jzr ^= (jzr << 5);
        jsr = jzr;
        return (jz+jzr) | 0;
    }