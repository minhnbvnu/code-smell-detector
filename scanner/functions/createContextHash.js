function createContextHash(paths, hashCode) {
    var ret = "",
        i = -1,
        l = paths.length;
    while (++i < l) {
        ret += paths[i].id + ":";
    }
    ret += hashCode;
    return ret;
}