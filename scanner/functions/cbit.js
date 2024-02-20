function cbit(x) {
    var r = 0;
    while (x != 0) {
        x &= x - 1;
        ++r;
    }
    return r;
}