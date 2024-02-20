function setPixel(v, i, rgba) {
    i *= 4;
    v[i + 0] = rgba[0];
    v[i + 1] = rgba[1];
    v[i + 2] = rgba[2];
    v[i + 3] = rgba[3];
}