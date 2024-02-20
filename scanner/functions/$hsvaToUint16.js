function $hsvaToUint16(color, c) {
    let r = 0, g = 0, b = 0, h = color.h;

    if (h !== undefined) {
        h = $loop(h, 0, 1);
        const s = $clamp(color.s, 0, 1), v = $clamp(color.v, 0, 1);

        // Convert to RGB
        // https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB
        let k = (5 + 6 * h) % 6;
        r = v - v * s * $Math.max(0, $Math.min(k, 4 - k, 1));

        k = (3 + 6 * h) % 6;
        g = v - v * s * $Math.max(0, $Math.min(k, 4 - k, 1));

        k = (1 + 6 * h) % 6;
        b = v - v * s * $Math.max(0, $Math.min(k, 4 - k, 1));
    }

    return (c | ((b * 15 + 0.5) << 8) | ((g * 15 + 0.5) << 4) | (r * 15 + 0.5)) >>> 0;
}