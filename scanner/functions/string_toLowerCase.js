function string_toLowerCase()
{
    var a = string_internal_toCharCodeArray(this);

    // This code assumes the array is a copy of the internal char array.
    // It may be more efficient to expose the internal data directly and
    // make a copy only when necessary.

    for (var i = 0; i < a.length; i++)
    {
        var c = a[i];

        // FIXME: support full Unicode
        if (c > 255) error("Only ASCII characters are currently supported");

        if ((c >= 65 && c <= 90) ||
            (c >= 192 && c <= 214) ||
            (c >= 216 && c <= 222))
        {
            a[i] = c + 32;
        }
    }

    return string_internal_fromCharCodeArray(a);
}