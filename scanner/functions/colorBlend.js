function colorBlend(mode, color1, color2) {
        var ab = color1.alpha; // result
        var // backdrop
        cb;
        var as = color2.alpha;
        var // source
        cs;
        var ar;
        var cr;
        var r = [];
        ar = as + ab * (1 - as);
        for (var i = 0; i < 3; i++) {
            cb = color1.rgb[i] / 255;
            cs = color2.rgb[i] / 255;
            cr = mode(cb, cs);
            if (ar) {
                cr = (as * cs + ab * (cb -
                    as * (cb + cs - cr))) / ar;
            }
            r[i] = cr * 255;
        }
        return new color_1.default(r, ar);
    }