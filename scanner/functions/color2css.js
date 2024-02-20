function color2css(color, alpha) {
        const [r, g, b, a] = color2rgba(color, alpha);
        return `rgba(${r}, ${g}, ${b}, ${a / 255})`;
    }