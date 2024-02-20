function diffHash(h1, h2) {
    var ret = {};
    for (var i in h1) {
        if (!hasOwnProperty.call(h2, i)) {
            ret[i] = h1[i];
        }
    }
    return ret;
}