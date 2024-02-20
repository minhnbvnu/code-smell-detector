function getPixel(v, i) {
    i *= 4;
    return [v[i + 0], v[i + 1], v[i + 2], v[i + 3]];
}