function htmlColorChannel4Bit(value) {
    value = clamp(value, 0, 1);
    value = (value * 15 + 0.5) >>> 0;
    value = (value << 4) + value;
    return value;
}