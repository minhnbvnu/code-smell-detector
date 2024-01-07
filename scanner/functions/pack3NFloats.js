function pack3NFloats(a, b, c) {
    const packed = ((a * 255) << 16) | ((b * 255) << 8) | (c * 255);
    return (packed) / (1 << 24);
}