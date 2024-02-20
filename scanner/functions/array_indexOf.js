function array_indexOf(searchElement, fromIndex)
{
    var o = this;
    var len = o.length;

    if ($argc <= 1)
        fromIndex = 0;
    else
    {
        if (fromIndex < 0)
        {
            fromIndex = len + fromIndex;
            if (fromIndex < 0)
                fromIndex = 0;
        }
    }

    for (var i=fromIndex; i<len; i++)
        if (o[i] === searchElement)
            return i;

    return -1;
}