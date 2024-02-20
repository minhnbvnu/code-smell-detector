function $hash(d) {
    // 32-bit FNV-1a
    var hval = 0x811c9dc5;
    
    if (d.length) {
        // String
        for (var i = d.length - 1; i >= 0; --i) {
            hval ^= d.charCodeAt(i);
            hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
        }
    } else {
        // Number
        $hashview.setFloat64(0, d);
        for (var i = 7; i >= 0; --i) {
            hval ^= $hashview.getUint8(i);
            hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
        }

        // Near integers, FNV sometimes does a bad job because it doesn't
        // mix the low bits enough. XOR with some well-distributed
        // bits
        hval ^= ($fract($Math.sin(d * 10) * 1e6) * 0xffffffff) | 0;
    }
    
    // Force to unsigned 32-bit
    return (hval >>> 0);
}