function array_filter(callbackfn, thisArg)
{
    var o = this;
    var len = o.length;

    var a = [];

    for (var i=0; i<len; i++)
    {
        var x = o[i];
        if (callbackfn.call(thisArg, x, i, o))
            a.push(x);
    }

    return a;
}