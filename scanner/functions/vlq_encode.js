function vlq_encode(num) {
    var result = "";
    num = Math.abs(num) << 1 | num >>> 31;
    do {
        var bits = num & 31;
        if (num >>>= 5) bits |= 32;
        result += vlq_char[bits];
    } while (num);
    return result;
}