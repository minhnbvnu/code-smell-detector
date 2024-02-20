function $SRGB_to_RGB_one_channel(u) {
    return u > 0.04045 ? $Math.pow(((u + 0.055) * (1 / 1.055)), 2.4) : u * (1 / 12.92);
}