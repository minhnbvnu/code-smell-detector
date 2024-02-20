function get_info(scales, [sxy0, sxy1]) {
        const info = new Map();
        for (const [name, scale] of scales) {
            const [start, end] = scale.r_invert(sxy0, sxy1);
            info.set(name, { start, end });
        }
        return info;
    }