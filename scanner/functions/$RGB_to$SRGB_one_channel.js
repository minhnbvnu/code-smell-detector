function $RGB_to$SRGB_one_channel(u) {
    return  u > 0.0031308 ? 1.055 * $Math.pow(u, (1 / 2.4)) - 0.055 : 12.92 * u;
}