function array_map(callbackfn, thisArg)
{
    var o = this;
    var len = o.length;

    var a = new Array(len);

    for (var i=0; i<len; i++)
        a[i] = callbackfn.call(thisArg, o[i], i, o);

    return a;
}