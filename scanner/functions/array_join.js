function array_join(separator)
{
    var o = this;

    if (separator === undefined)
        separator = ",";
    else if (!$ir_is_string(separator))
        separator = $rt_toString(separator);

    var outStr = '';

    var arrLen = o.length;

    if (arrLen > 0)
    {
        var elem = o[0];

        // Use the += operator to do concatenation lazily using ropes
        if (!$ir_is_undef(elem))
            outStr += elem;
    }

    for (var i = 1; i < arrLen; ++i)
    {
        outStr += separator;

        var elem = o[i];

        // Use the += operator to do concatenation lazily using ropes
        if (!$ir_is_undef(elem))
            outStr += elem;
    }

    return outStr;
}