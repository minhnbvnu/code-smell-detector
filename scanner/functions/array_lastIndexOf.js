function array_lastIndexOf(searchElement, fromIndex)
{
    var o = this;
    var len = o.length;

    if (arguments.length <= 1 || fromIndex >= len)
        fromIndex = len-1;
    else if (fromIndex < 0)
        fromIndex = len + fromIndex;

    for (var i=fromIndex; i>=0; i--)
        if (o[i] === searchElement)
            return i;

    return -1;
}