function encode_rgba([r, g, b, a]) {
        return r << 24 | g << 16 | b << 8 | a;
    }