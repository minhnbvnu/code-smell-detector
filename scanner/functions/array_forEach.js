function array_forEach(callbackfn, thisArg)
{
    var o = this;
    var len = o.length;

    for (var i=0; i<len; i++)
        callbackfn.call(thisArg, o[i], i, o);
}