function conjugate(out, a) {
        out[0] = -a[0];
        out[1] = -a[1];
        out[2] = -a[2];
        out[3] = a[3];
        out[4] = -a[4];
        out[5] = -a[5];
        out[6] = -a[6];
        out[7] = a[7];
        return out;
    }