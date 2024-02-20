function update_ranges(scales, p0, p1) {
        const r = new Map();
        for (const [name, scale] of scales) {
            const [start, end] = scale.r_invert(p0, p1);
            r.set(name, { start, end });
        }
        return r;
    }