function string_indexOf(searchString, pos)
{
    var i;

    if (pos === undefined || pos < 0)
        i = 0;
    else
        i = pos;

    for (; i < this.length; ++i)
    {
        var j;

        for (j = 0; j < searchString.length; ++j)
            if (this.charCodeAt(i + j) !== searchString.charCodeAt(j))
                break;
        if (j === searchString.length)
            return i;
    }
    return -1;
}