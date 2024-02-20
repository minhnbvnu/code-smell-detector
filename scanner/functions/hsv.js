function hsv(h, s, v) {
    if (Array.isArray(h)) {
        v = h[2];
        s = h[1];
        h = h[0];
    }
    
    if (h.r !== undefined) {
        // Convert RGB -> HSV
        const r = $clamp(h.r, 0, 1), g = $clamp(h.g, 0, 1), b = $clamp(h.b, 0, 1);

        v = $Math.max(r, g, b);

        if (v <= 0) {
            // Black
            h = 0; s = 0;
        } else {
            const lowest = $Math.min(r, g, b);

            // (highest - lowest) / highest = 1 - lowest / v
            s = 1 - lowest / v;
            const diff = v - lowest;

            if (diff > 0) {
                // Choose range based on which is the highest
                if (r === v)      { h =     (g - b) / diff; } // between yellow & magenta
                else if (g === v) { h = 2 + (b - r) / diff; } // between cyan & yellow
                else              { h = 4 + (r - g) / diff; } // between magenta & cyan
            } else {
                h = 0;
            }
            
            h /= 6;
            if (h < 0) { h += 1; }
        }
    } else if (h.h !== undefined) {
        // Clone hsv or hsva -> hsv
        v = h.v;
        s = h.s;
        h = h.h;
    } else if (h.$color) {
        return hsv(rgb(h));
    }

    return {h:h, s:s, v:v};
}