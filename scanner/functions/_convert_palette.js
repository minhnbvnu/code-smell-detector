function _convert_palette(palette) {
        const new_palette = new Uint32Array(palette.length);
        for (let i = 0, end = palette.length; i < end; i++)
            new_palette[i] = _convert_color(palette[i]);
        return new_palette;
    }