function brightness(color) {
        // Perceived brightness of a color in [0, 1] range.
        // http://alienryderflex.com/hsp.html
        const [r, g, b] = color2rgba(color);
        return sqrt(0.299 * r ** 2 + 0.587 * g ** 2 + 0.114 * b ** 2) / 255;
    }