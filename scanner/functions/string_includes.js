function string_includes(searchString, position)
{
    if (this === null || this === undefined)
        throw new TypeError("this cannot be null or undefined");

    if (searchString instanceof RegExp)
        throw new TypeError("searchString cannot be a RegExp");

    var src = $rt_toString(this);
    var searchStr = $rt_toString(searchString);
    var pos = $rt_toInteger(position);
    var len = src.length;
    var start = Math.min(Math.max(pos, 0), len);
    var searchLen = searchStr.length;

    var k = start;
    while ((k + searchLen) <= len)
    {
        var j = 0;
        while (j < searchLen)
        {
            if (src[k + j] !== searchStr[j]) break;
            j++;
        }
        // Found a valid `k`.
        if (j === searchLen) return true;
        k++;
    }

    return false;
}