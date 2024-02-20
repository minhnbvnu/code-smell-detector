function interp_palette(palette, n) {
        const npalette = palette.length;
        if (npalette < 1)
            throw new Error("palette must contain at least one color");
        if (n < 0)
            throw new Error("requested palette length cannot be negative");
        // Arrayable.interpolate operates on whole arrays, not slices, so need separate
        // arrays for each of the R, G, B and A components.
        const r = new Uint8Array(n);
        const g = new Uint8Array(n);
        const b = new Uint8Array(n);
        const a = new Uint8Array(n);
        for (let i = 0; i < npalette; i++) {
            [r[i], g[i], b[i], a[i]] = (0, color_1.color2rgba)(palette[i]);
        }
        const integers = (0, array_1.range)(0, npalette);
        const fractions = (0, array_1.linspace)(0, npalette - 1, n);
        const r_interp = (0, arrayable_1.interpolate)(fractions, integers, r);
        const g_interp = (0, arrayable_1.interpolate)(fractions, integers, g);
        const b_interp = (0, arrayable_1.interpolate)(fractions, integers, b);
        const a_interp = (0, arrayable_1.interpolate)(fractions, integers, a);
        const ret = new Array(n);
        for (let i = 0; i < n; i++) {
            ret[i] = [(0, color_1.byte)(r_interp[i]), (0, color_1.byte)(g_interp[i]), (0, color_1.byte)(b_interp[i]), (0, color_1.byte)(a_interp[i])];
        }
        return ret;
    }