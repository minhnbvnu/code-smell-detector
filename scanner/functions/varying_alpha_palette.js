function varying_alpha_palette(color, n = null, start_alpha = 0, end_alpha = 255) {
        if (start_alpha < 0 || start_alpha > 255)
            throw new Error("start_alpha must be in the range 0 to 255");
        if (end_alpha < 0 || end_alpha > 255)
            throw new Error("end_alpha must be in the range 0 to 255");
        const rgba = (0, color_1.color2rgba)(color);
        if (rgba[3] < 255) {
            const factor = rgba[3] / 255;
            start_alpha *= factor;
            end_alpha *= factor;
        }
        // Length of returned palette
        const npalette = (n != null && n > 0) ? n : Math.round(Math.abs(end_alpha - start_alpha)) + 1;
        // Convert alpha to range 0 to 1
        const diff_alpha = (end_alpha - start_alpha) / 255;
        start_alpha /= 255;
        const palette = new Array(npalette);
        for (let i = 0; i < npalette; i++)
            palette[i] = (0, color_1.color2hex)(rgba, start_alpha + diff_alpha * i / (npalette - 1));
        return palette;
    }