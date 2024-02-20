function readIntLE(buf, offset, byteLength) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    let val = buf[offset];
    let mul = 1;
    let i = 0;
    while (++i < byteLength && (mul *= 0x100)) {
        val += buf[offset + i] * mul;
    }
    mul *= 0x80;
    if (val >= mul)
        val -= Math.pow(2, 8 * byteLength);
    return val;
}