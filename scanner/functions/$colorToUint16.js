function $colorToUint16(color) {
    if (color === undefined) { return 0; }
    if (color.$color !== undefined) { return color.$color; }
    
    const color_a = color.a, color_r = color.r;
    const c = (color_a === undefined) ? 0xF000 : (((($clamp(color_a, 0, 1) * 15 + 0.5) & 0xf) << 12) >>> 0);
    
    if (color_r === undefined) { return $hsvaToUint16(color, c); }
    
    return (c | (($clamp(color.b, 0, 1) * 15 + 0.5) << 8) | (($clamp(color.g, 0, 1) * 15 + 0.5) << 4) | ($clamp(color_r, 0, 1) * 15 + 0.5)) >>> 0;
}