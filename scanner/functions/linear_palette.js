function linear_palette(palette, n) {
        if (n <= palette.length)
            return (0, array_1.linspace)(0, palette.length - 1, n).map((i) => palette[i | 0]);
        else
            throw new Error("too many color entries requested");
    }