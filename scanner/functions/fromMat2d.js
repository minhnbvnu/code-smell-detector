function fromMat2d(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = 0;
        out[3] = a[2];
        out[4] = a[3];
        out[5] = 0;
        out[6] = a[4];
        out[7] = a[5];
        out[8] = 1;
        return out;
    }