function $rt_toInteger(val)
{
    var number = $rt_toNumber(val);

    // NaN
    if (number !== number) return +0;

    // -0, +0, -Infinity, Infinity
    if (number === 0 ||
        number === Infinity ||
        number === -Infinity)
    {
            return number;
    }

    var sign = number < 0 ? -1 : 1;
    return sign * Math.floor(Math.abs(number));
}