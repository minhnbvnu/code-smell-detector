function string_toUpperCase()
{
    var a = string_internal_toCharCodeArray(this);

    for (var i = 0; i < a.length; i++)
    {
        var c = a[i];

        // FIXME: support full Unicode
        if (c > 255)
            error("Only ASCII characters are currently supported");

        if ((c >= 97 && c <= 122)  ||
            (c >= 224 && c <= 246) ||
            (c >= 248 && c <= 254))
            a[i] = c - 32;
    }

    return string_internal_fromCharCodeArray(a);
}