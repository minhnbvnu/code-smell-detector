function sc_string2integer(s, radix) {
    if (!radix) return +s;
    return parseInt(s, radix);
}