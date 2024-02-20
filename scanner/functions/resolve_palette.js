function resolve_palette(palette = "Spectral11") {
        return (0, types_1.isArray)(palette) ? palette : palettes[palette];
    }