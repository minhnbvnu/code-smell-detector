function array_shift()
{
    // This implementation of shift assumes that no element of the
    // array is deleted.

    var o = this;
    var len = o.length;

    if (len === 0)
        return undefined;

    var first = o[0];

    for (var i=1; i<len; i++)
        o[i-1] = o[i];

    //delete o[len-1];
    o.length = len-1;

    return first;
}