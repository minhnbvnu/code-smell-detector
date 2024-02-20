function string_codePointAt(pos)
{
    if (this === null || this === undefined)
        throw new TypeError("this cannot be null or undefined");

    var src = $rt_toString(this);
    var position = $rt_toInteger(pos);
    var size = src.length;

    if (position < 0 || position >= size) return undefined;

    var first = src.charCodeAt(position);

    if (first < 0xD800 || first > 0xDBFF || (position + 1) === size) return first;

    var second = src.charCodeAt(position + 1);

    if (second < 0xDC00 || second > 0xDFFF) return first;

    return string_internal_utf16decode(first, second);
}