function string_startsWith(searchString, position)
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
    var searchLength = searchStr.length;

    if (start + searchLength > len)
        return false;

    return src.substr(start, searchLength) === searchStr;
}