function decode_rgba(rgba) {
        const r = (rgba >> 24) & 0xff;
        const g = (rgba >> 16) & 0xff;
        const b = (rgba >> 8) & 0xff;
        const a = rgba & 0xff;
        return [r, g, b, a];
    }