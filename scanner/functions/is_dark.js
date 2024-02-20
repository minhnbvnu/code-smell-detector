function is_dark([r, g, b]) {
        const l = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return l >= 0.6;
    }