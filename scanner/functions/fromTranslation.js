function fromTranslation(out, t) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        out[4] = t[0] * 0.5;
        out[5] = t[1] * 0.5;
        out[6] = t[2] * 0.5;
        out[7] = 0;
        return out;
    }