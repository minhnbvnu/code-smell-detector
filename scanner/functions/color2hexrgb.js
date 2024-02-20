function color2hexrgb(color) {
        const [r, g, b] = color2rgba(color);
        return `#${hex(r)}${hex(g)}${hex(b)}`;
    }