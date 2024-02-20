function $LAsBs_to_XYZ_one_channel(n) {
    return n > 0.206893034 ? (n * n * n) : (n - 16 / 116) * (1 / 7.787);
}