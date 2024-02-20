function string_endsWith(searchString, endPosition)
{
    if (this === null || this === undefined)
        throw new TypeError("this cannot be null or undefined");

    if (searchString instanceof RegExp)
        throw new TypeError("searchString cannot be a RegExp");

    var src = $rt_toString(this);
    var searchStr = $rt_toString(searchString);
    var len = src.length;
    var pos = endPosition === undefined ? len : $rt_toInteger(endPosition);
    var end = Math.min(Math.max(pos, 0), len);
    var searchLength = searchStr.length;

    var start = end - searchLength;
    if (start < 0)
        return false;

    return src.substr(start, searchLength) === searchStr;
}