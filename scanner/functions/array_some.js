function array_some(
    callbackfn,
    thisArg
)
{
    var o = this;
    var len = o.length;

    for (var i = 0; i < len; i++)
        if (callbackfn.call(thisArg, o[i], i, o))
            return true;
    return false;
}