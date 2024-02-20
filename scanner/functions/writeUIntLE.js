function writeUIntLE(buf, value, offset, byteLength) {
    value = +value;
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    let mul = 1;
    let i = 0;
    buf[offset] = value & 0xFF;
    while (++i < byteLength && (mul *= 0x100)) {
        buf[offset + i] = (value / mul) & 0xFF;
    }
    return offset + byteLength;
}