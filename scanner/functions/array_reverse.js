function array_reverse()
{
    // This implementation of reverse assumes that no element of the
    // array is deleted.

    var o = this;
    var len = o.length;
    var lo = 0;
    var hi = len - 1;

    while (lo < hi)
    {
        var tmp = o[hi];
        o[hi] = o[lo];
        o[lo] = tmp;
        lo++;
        hi--;
    }

    return o;
}