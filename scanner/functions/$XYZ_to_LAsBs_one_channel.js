function $XYZ_to_LAsBs_one_channel(u) {
    return u > 0.008856 ? $Math.cbrt(u) : 7.787 * u + 16 / 116;
}