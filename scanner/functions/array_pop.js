function array_pop()
{
    var o = this;
    var len = o.length;

    if (len === 0)
        return undefined;

    var result = o[len-1];

    o.length = len-1;

    return result;
}