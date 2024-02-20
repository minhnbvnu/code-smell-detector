function rgb(r, g, b) {
    if (arguments.length !== 3 && arguments.length !== 1) { $error('rgb() requires exactly one or three arguments or one hsv value'); }

    if (Array.isArray(r)) {
        b = r[2];
        g = r[1];
        r = r[0];
    }

    if (r.h !== undefined) {
        // Convert HSV --> RGB
        const h = $loop(r.h, 0, 1), s = $clamp(r.s, 0, 1), v = $clamp(r.v, 0, 1);
        let k = (5 + 6 * h) % 6;
        r = v - v * s * $Math.max(0, $Math.min(k, 4 - k, 1));

        k = (3 + 6 * h) % 6;
        g = v - v * s * $Math.max(0, $Math.min(k, 4 - k, 1));

        k = (1 + 6 * h) % 6;
        b = v - v * s * $Math.max(0, $Math.min(k, 4 - k, 1));
        /*
        r = v * (1 - s + s * $clamp($Math.abs($fract(h +  1 ) * 6 - 3) - 1, 0, 1));
        g = v * (1 - s + s * $clamp($Math.abs($fract(h + 2/3) * 6 - 3) - 1, 0, 1));
        b = v * (1 - s + s * $clamp($Math.abs($fract(h + 1/3) * 6 - 3) - 1, 0, 1));
        */
    } else if (r.r !== undefined) {
        // Clone
        g = r.g;
        b = r.b;
        r = r.r;
    } else if (r.$color !== undefined) {
        return rgb(rgba(r.$color));
    } else if (typeof r === 'string' && r[0] === '#') {
        return rgb($parseHexColor(r.substring(1)));
    } else {
        r = $clamp(r, 0, 1);
        g = $clamp(g, 0, 1);
        b = $clamp(b, 0, 1);
    }
    
    return {r:r, g:g, b:b};
}