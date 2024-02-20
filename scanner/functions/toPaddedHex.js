function toPaddedHex(c) {
    var s = c.toString(16);
    return s.length < 2 ? '0' + s : s;
}