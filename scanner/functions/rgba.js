function rgba(r, g, b, a) {
    if (Array.isArray(r)) {
        a = r[3];
        b = r[2];
        g = r[1];
        r = r[0];
    }
   
    if (r.h !== undefined) {
        // Convert to RGB
        const c = rgb(r);

        // add a
        if (r.a !== undefined) {
            c.a = r.a;
        } else {
            c.a = (g === undefined ? 1 : g);
        }
        return c;
    } else if (r.r !== undefined) {
        // Clone, maybe overriding alpha
        a = (r.a === undefined) ? (g === undefined ? 1 : g) : r.a;
        g = r.g;
        b = r.b;
        r = r.r;
    } else if (r.$color !== undefined) {
        const c = r.$color;
        r = (c & 0xf) * (1 / 15);
        g = ((c >> 4) & 0xf) * (1 / 15);
        b = ((c >> 8) & 0xf) * (1 / 15);
        a = ((c >>> 12) & 0xf) * (1 / 15);
    } else if (typeof r === 'string' && r[0] === '#') {
        return rgba($parseHexColor(r.substring(1)));
    } else {
        r = $clamp(r, 0, 1);
        g = $clamp(g, 0, 1);
        b = $clamp(b, 0, 1);
        a = $clamp(a, 0, 1);
    }
    
    return {r:r, g:g, b:b, a:a};
}