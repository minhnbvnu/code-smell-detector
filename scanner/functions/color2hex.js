function color2hex(color, alpha) {
        const [r, g, b, a] = color2rgba(color, alpha);
        const rgb = `#${hex(r)}${hex(g)}${hex(b)}`;
        return a == 255 ? rgb : `${rgb}${hex(a)}`;
    }