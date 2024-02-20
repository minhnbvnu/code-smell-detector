function vlq_decode(indices, str) {
    var value = 0;
    var shift = 0;
    for (var i = 0, j = 0; i < str.length; i++) {
        var bits = vlq_bits[str[i]];
        value += (bits & 31) << shift;
        if (bits & 32) {
            shift += 5;
        } else {
            indices[j++] += value & 1 ? 0x80000000 | -(value >> 1) : value >> 1;
            value = shift = 0;
        }
    }
    return j;
}