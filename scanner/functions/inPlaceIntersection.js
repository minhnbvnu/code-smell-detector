function inPlaceIntersection(a, b) {
    var aOne, i = -1, l;
    l = a.length;
    while (++i < l) {
        aOne = a[i];
        if (indexOf(b, aOne) === -1) {
            pSplice.call(a, i--, 1);
            l--;
        }
    }
    return a;
}