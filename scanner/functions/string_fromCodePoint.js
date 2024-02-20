function string_fromCodePoint()
{
    var push = Array.prototype.push;
    var fromCharCode = String.fromCharCode;

    var codePoints = arguments;
    var length = codePoints.length;
    var elements = [];
    var nextIndex = 0;

    while (nextIndex < length)
    {
        var next = codePoints[nextIndex];
        var nextCP = $rt_toNumber(next);

        if (!Object.is(nextCP, $rt_toInteger(nextCP)))
            throw RangeError("Code point cannot be a floating point");

        if (nextCP < 0 || nextCP > 0x10FFFF)
            throw RangeError("Code point " + next + " is not valid");

        push.apply(elements, string_internal_utf16encoding(nextCP));
        nextIndex++;
    }

    return elements.length === 0 ? '' : fromCharCode.apply(null, elements);
}