function string_substring(start, end)
{
    var source = $rt_toString(this);
    var length = $rt_str_get_len(source);

    if (!$ir_is_int32(start))
    {
        start = $rt_toInt32(start);
    }

    if (!$ir_is_int32(end))
    {
        if (end === undefined)
            end = length;
        else
            end = $rt_toInt32(end);
    }

    if (start < 0)
        start = 0;
    else if (start > length)
        start = length;

    if (end > length)
        end = length;
    else if (end < 0)
        end = 0;

    if (start > end)
    {
        var tmp = start;
        start = end;
        end = tmp;
    }

    // Allocate new string
    var s = $rt_str_alloc(end - start);

    // Copy substring characters in the new allocated string
    for (var i = start, j = 0; i < end; ++i, ++j)
    {
        var ch = $rt_str_get_data(source, i);
        $rt_str_set_data(s, j, ch);
    }

    return $ir_get_str(s);
}