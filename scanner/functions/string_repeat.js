function string_repeat(count)
{
    if (this === null || this === undefined)
        throw new TypeError("this cannot be null or undefined");

    var str = $rt_toString(this);
    var n = $rt_toInteger(count);

    if (n < 0 || n === Infinity)
        throw new RangeError("Count must be positive and cannot be Infinity");

    if (str.length === 0 || count === 0) return '';

    var buff = '';
    for (var i = 0; i < count; i++)
    {
        buff += str;
    }

    return buff;
}