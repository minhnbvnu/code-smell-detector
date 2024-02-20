function canBroadcast(src, dst) {
    if (src.length > dst.length) {
        return false;
    }
    for (var i = 0; i < src.length; ++i) {
        if (src[i] !== dst[dst.length - src.length + i]) {
            return false;
        }
    }
    return true;
}