function unparse_hex_color(c) {
    function hex(v) {
        v = $clamp($Math.floor(v * 256), 0, 255) | 0;
        return (v < 16 ? '0' : '') + v.toString(16);
    }
    
    if (c.h !== undefined) {
        if (c.a !== undefined) {
            return unparse_hex_color(rgba(c));
        } else {
            return unparse_hex_color(rgb(c));
        }
    }

    return '#' + hex(c.r) + hex(c.g) + hex(c.b) + (c.a !== undefined ? hex(c.a) : '');
}