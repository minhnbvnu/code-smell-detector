function css4_parse(color) {
        var _a;
        /**
          Parses CSS4 color strings:
      
          - transparent
          - named color
          - #RRGGBB[AA]
          - #RGB[A]
          - rgb[a](R G B[ / A])
          - rgb[a](R, G, B[, A])
          - other CSS4 syntax (browser dependent)
      
        */
        color = color.trim().toLowerCase();
        if (color == "")
            return null;
        else if (color == "transparent")
            return transparent();
        else if ((0, svg_colors_1.is_named_color)(color)) {
            return decode_rgba(svg_colors_1.named_colors[color]);
        }
        else if (color[0] == "#") {
            const v = Number(`0x${color.substring(1)}`);
            if (isNaN(v))
                return null;
            switch (color.length - 1) {
                case 3: {
                    const r = (v >> 8) & 0xf;
                    const g = (v >> 4) & 0xf;
                    const b = (v >> 0) & 0xf;
                    const rr = (r << 4) | r;
                    const gg = (g << 4) | g;
                    const bb = (b << 4) | b;
                    return [rr, gg, bb, 255];
                }
                case 4: {
                    const r = (v >> 12) & 0xf;
                    const g = (v >> 8) & 0xf;
                    const b = (v >> 4) & 0xf;
                    const a = (v >> 0) & 0xf;
                    const rr = (r << 4) | r;
                    const gg = (g << 4) | g;
                    const bb = (b << 4) | b;
                    const aa = (a << 4) | a;
                    return [rr, gg, bb, aa];
                }
                case 6: {
                    const rr = (v >> 16) & 0xff;
                    const gg = (v >> 8) & 0xff;
                    const bb = (v >> 0) & 0xff;
                    return [rr, gg, bb, 255];
                }
                case 8: {
                    const rr = (v >> 24) & 0xff;
                    const gg = (v >> 16) & 0xff;
                    const bb = (v >> 8) & 0xff;
                    const aa = (v >> 0) & 0xff;
                    return [rr, gg, bb, aa];
                }
            }
        }
        else if (color.startsWith("rgb")) {
            const result = (_a = color.match(rgb_modern)) !== null && _a !== void 0 ? _a : color.match(rgb_legacy);
            if ((result === null || result === void 0 ? void 0 : result.groups) != null) {
                let { r, g, b, a = "1" } = result.groups;
                const rp = r.endsWith("%");
                const gp = g.endsWith("%");
                const bp = b.endsWith("%");
                const ap = a.endsWith("%");
                if (!(rp && gp && bp || (!rp && !gp && !bp)))
                    return null;
                if (rp)
                    r = r.slice(0, -1);
                if (gp)
                    g = g.slice(0, -1);
                if (bp)
                    b = b.slice(0, -1);
                if (ap)
                    a = a.slice(0, -1);
                let R = Number(r);
                let G = Number(g);
                let B = Number(b);
                let A = Number(a);
                if (isNaN(R + G + B + A))
                    return null;
                if (rp)
                    R = 255 * (R / 100);
                if (gp)
                    G = 255 * (G / 100);
                if (bp)
                    B = 255 * (B / 100);
                A = 255 * (ap ? A / 100 : A);
                R = byte(R);
                G = byte(G);
                B = byte(B);
                A = byte(A);
                return [R, G, B, A];
            }
        }
        else {
            const style = css4_normalize(color);
            if (style != null)
                return css4_parse(style);
        }
        return null;
    }