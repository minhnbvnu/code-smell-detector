function hslAdjust(v1) {
        if (v1 instanceof vg.Group) {
            var newShapes = [];
            for (var i = 0; i < v1.shapes.length; i += 1) {
                newShapes.push(hslAdjust(v1.shapes[i]));
            }
            return new vg.Group(newShapes);
        } else if (v1 instanceof vg.Path) {
            var p = v1.clone();
            p.fill = hslAdjust(p.fill);
            p.stroke = hslAdjust(p.stroke);
            return p;
        }
        var c = v1;
        if (!(c instanceof vg.Color)) {
            c = vg.Color.parse(c);
        }

        r = c.r;
        g = c.g;
        b = c.b;

        if (hue !== 0 || saturation !== 0) {
            // ok, here comes rgb to hsl + adjust + hsl to rgb, all in one jumbled mess.
            // It's not so pretty, but it's been optimized to get somewhat decent performance.
            // The transforms were originally adapted from the ones found in Graphics Gems, but have been heavily modified.
            vs = r;
            if (g > vs) {
                vs = g;
            }
            if (b > vs) {
                vs = b;
            }
            ms = r;
            if (g < ms) {
                ms = g;
            }
            if (b < ms) {
                ms = b;
            }
            vm = vs - ms;
            l = (ms + vs) / 2;

            if (l > 0 && vm > 0) {
                if (l <= 0.5) {
                    s = vm / (vs + ms) * satMul;
                    if (s > 1) {
                        s = 1;
                    }
                    v = (l * (1 + s));
                } else {
                    s = vm / (2 - vs - ms) * satMul;
                    if (s > 1) {
                        s = 1;
                    }
                    v = (l + s - l * s);
                }
                if (r === vs) {
                    if (g === ms) {
                        h = 5 + ((vs - b) / vm) + hue;
                    } else {
                        h = 1 - ((vs - g) / vm) + hue;
                    }
                } else if (g === vs) {
                    if (b === ms) {
                        h = 1 + ((vs - r) / vm) + hue;
                    } else {
                        h = 3 - ((vs - b) / vm) + hue;
                    }
                } else {
                    if (r === ms) {
                        h = 3 + ((vs - g) / vm) + hue;
                    } else {
                        h = 5 - ((vs - r) / vm) + hue;
                    }
                }
                if (h < 0) {
                    h += 6;
                }
                if (h >= 6) {
                    h -= 6;
                }
                m = (l + l - v);
                sextant = h >> 0;
                vmh = (v - m) * (h - sextant);
                if (sextant === 0) {
                    r = v;
                    g = m + vmh;
                    b = m;
                } else if (sextant === 1) {
                    r = v - vmh;
                    g = v;
                    b = m;
                } else if (sextant === 2) {
                    r = m;
                    g = v;
                    b = m + vmh;
                } else if (sextant === 3) {
                    r = m;
                    g = v - vmh;
                    b = v;
                } else if (sextant === 4) {
                    r = m + vmh;
                    g = m;
                    b = v;
                } else if (sextant === 5) {
                    r = v;
                    g = m;
                    b = v - vmh;
                }
            }
        }

        r = r * lightMul + lightAdd;
        g = g * lightMul + lightAdd;
        b = b * lightMul + lightAdd;

        if (r < 0) { r = 0; }
        if (g < 0) { g = 0; }
        if (b < 0) { b = 0; }
        if (r > 1) { r = 1; }
        if (g > 1) { g = 1; }
        if (b > 1) { b = 1; }

        return new vg.Color(r, g, b, c.a + alpha);
    }