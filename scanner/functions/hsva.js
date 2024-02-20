function hsva(h, s, v, a) {
    if (Array.isArray(h)) {
        a = h[3];
        v = h[2];
        s = h[1];
        h = h[0];
    }
    
    if (h.r !== undefined) {
        const c = hsv(h);
        c.a = (h.a !== undefined) ? h.a : 1;
        return c;
    } else if (h.h !== undefined) {
        // Clone, or hsv -> hsva
        a = (h.a === undefined) ? 1 : h.a;
        v = h.v;
        s = h.s;
        h = h.h;
    } else if (h.$color !== undefined) {
        return hsva(rgba(r));
    }
    
    return {h:h, s:s, v:v, a:a};
}