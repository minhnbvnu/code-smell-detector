function colorToHexString(color, scale = 15) {
    function percentTo255Hex(v) {
        // Convert to integer
        v = clamp(Math.round(v * scale), 0, scale);
        // Zero pad and hex convert
        return (v < 16 && scale === 255 ? '0' : '') + v.toString(16);
    }

    let s;
    if (color.h !== undefined) {
        // hsv
        s = colorToHexString(rgb(color));
        
    } else {
        // rgb
        s = '#';
        s += percentTo255Hex(color.r) + percentTo255Hex(color.g) + percentTo255Hex(color.b);
    }

    if (color.a !== undefined) {
        s += percentTo255Hex(color.a);
    }

    return s.toUpperCase();
}